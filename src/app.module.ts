import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import {  Users } from './modules/users/Entitys/users.entity';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { AcessRole } from './modules/users/Entitys/role.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, AcessRole]), 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private authService: AuthService,
    @InjectRepository(AcessRole)
    private roleRepo: Repository<AcessRole>,

    @InjectRepository(Users)
    private userRepo: Repository<Users>,
  ) { }
  async onModuleInit() {
    // 1. Check if admin role exists
    let adminRole = await this.roleRepo.findOne({ where: { name: 'admin' } });

    if (!adminRole) {
      adminRole = this.roleRepo.create({ name: 'admin' });
      await this.roleRepo.save(adminRole);
      console.log('Admin role created');
    }

    let userRole = await this.roleRepo.findOne({ where: { name: 'user' } });
    if (!userRole) {
      userRole = await this.roleRepo.save(this.roleRepo.create({ name: 'user' }));
    }

    // 2. Check if admin user exists
    let adminUser = await this.userRepo.findOne({
      where: { phonenumber: process.env.ADMIN_PHONENUMBER },
    });   
    if (!adminUser) {
      const hashed = await this.authService.hash(process.env.ADMIN_PASSWORD||"1234");
      adminUser = this.userRepo.create({
        phonenumber: process.env.ADMIN_PHONENUMBER||"09133109219",
        username: process.env.ADMIN_USERNAME||"admin",
        password: hashed,
        image: process.env.ADMIN_IMAGE|| "/images/users/male.png",
        role: adminRole,
      });

      await this.userRepo.save(adminUser);
      console.log('Default admin user created');
    }
  }

}

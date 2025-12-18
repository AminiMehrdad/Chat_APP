import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserId {
    constructor (
        private readonly jwtService: JwtService
    ){}
    async findUserId(refreshToken: string): Promise<number> {
        const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: process.env.JWT_ACCESS_SECRET,
        })
        return payload.sub
    }
}

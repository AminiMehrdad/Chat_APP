import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl, body } = req;
    const start = Date.now();

    console.log(`[Incoming] ${method} ${originalUrl} Body:`, body);

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - start;
        console.log(
          `[Response] ${method} ${originalUrl} - ${duration}ms`,
          // 'Response:',
          // data,
        );
      }),
    );
  }
}

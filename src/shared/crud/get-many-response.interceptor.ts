import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GetManyResponseInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                if (!data) {
                    return;
                }

                if (Array.isArray(data)) {
                    return data;
                }

                if (
                    data.data &&
                    data.hasOwnProperty('count') &&
                    data.hasOwnProperty('total') &&
                    data.hasOwnProperty('page') &&
                    data.hasOwnProperty('pageCount')
                ) {
                    // Expect matched GetManyDefaultResponse
                    const res: Response = context.switchToHttp().getResponse();
                    res.append('x-pagination-count', data.count);
                    res.append('x-pagination-total', data.total);
                    res.append('x-pagination-page', data.page);
                    res.append('x-pagination-page-count', data.pageCount);
                    return data.data;
                }

                return data;
            }),
        );
    }
}

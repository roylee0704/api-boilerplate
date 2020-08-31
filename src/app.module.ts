import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfigService } from '@shared/config';
import { HttpExceptionFilter } from '@shared/filters/http.exception.filter';
import { SharedModule } from '@shared/shared.module';
import { AdminPermissionModule } from './admin-permission/admin-permission.module';
import { AdminRolesModule } from './admin-role/admin-role.module';
import { AdminUserModule } from './admin-user/admin-user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { I18nModule } from './i18n/I18n.module';
import { I18nService } from './i18n/i18n.service';
import { RequestContextMiddleware } from './shared/middlewares/request-context.middleware';


@Module({
    imports: [
        SharedModule,
        I18nModule,
        AuthModule,
        AdminUserModule,
        TerminusModule,
        AdminPermissionModule,
        AdminRolesModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {
    constructor(private configService: AppConfigService, private i18nService: I18nService) { }
    configure(consumer: MiddlewareConsumer) {
        const i18nextHandler = this.i18nService.handle();
        consumer.apply(i18nextHandler).forRoutes({ path: '*', method: RequestMethod.ALL });
        consumer.apply(RequestContextMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}

import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app.config.service';

@Global()
@Module({
    imports: [ConfigModule.forRoot({})],
    providers: [ConfigService, AppConfigService],
    exports: [AppConfigService],
})
export class AppConfigModule {}

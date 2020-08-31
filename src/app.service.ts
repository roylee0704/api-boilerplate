import { Injectable } from '@nestjs/common';
import { AppConfigService as AppConfig } from '@shared/config';

@Injectable()
export class AppService {
    constructor(private readonly config: AppConfig) {}
    getCurrentConfig(): string {
        return JSON.stringify(this.config.current);
    }
}

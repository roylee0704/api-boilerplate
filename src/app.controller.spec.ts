import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '@shared/shared.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [SharedModule, TerminusModule],
            controllers: [AppController],
            providers: [AppService],
        }).compile();
        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return current default config', () => {
            expect(appController.getCurrentConfig()).toBe('OK');
        });
    });

    describe('health', () => {
        it('should should call health check', async done => {
            const result = await appController.healthCheck();
            expect(typeof result).toBe('object');
            done();
        });
    });
});

import * as fs from 'fs';
import { INestApplication, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { AppConfigService as config } from '@shared/config';
import { LoggerService as Logger } from '@shared/logger/logger.service';
import { SharedModule } from '@shared/shared.module';
CrudConfigService.load({
    query: {
        limit: 25,
        maxLimit: 100,
        cache: 2000,
        alwaysPaginate: true,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    routes: {
        updateOneBase: {
            allowParamsOverride: true,
        },
        deleteOneBase: {
            returnDeleted: true,
        },
    },
});
import { AppModule } from './app.module';
import { GetManyResponseInterceptor } from './shared/crud/get-many-response.interceptor';

function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    fs.writeFileSync(`${process.cwd()}/swagger.json`, JSON.stringify(document, null, 2), { encoding: 'utf8' });
    SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
        bodyParser: true,
    });
    const appConfig = app.select(SharedModule).get(config);
    const port = appConfig.port;
    const apiBasePath = appConfig.apiBasePath;

    Logger.useLogger(appConfig.logger);
    app.useLogger(new Logger());

    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.enableCors(appConfig.cors);

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(...[new GetManyResponseInterceptor(), new ClassSerializerInterceptor(reflector)]);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    if (apiBasePath) {
        app.setGlobalPrefix(apiBasePath);
    }

    setupSwagger(app);

    await app.startAllMicroservicesAsync();
    await app.listen(port);

    Logger.log(`Swagger UI available at http://localhost:${port}/docs`);
    Logger.log(`Application is running on: http://localhost:${port}${apiBasePath || ''}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

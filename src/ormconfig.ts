import * as dotenv from 'dotenv-override';
import { SnakeNamingStrategy } from './shared/typeorm/snake-naming-strategy';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config({
    path: '.env',
    override: true,
});

// Replace \\n with \n to support multiline strings in AWS
for (const envName of Object.keys(process.env)) {
    process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
}

module.exports = {
    type: process.env.DB_CONNECTION || 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
    seeds: [__dirname + '/database/seeds/**/*{.ts,.js}'],
    factories: [__dirname + '/database/factories/**/*{.ts,.js}'],
    namingStrategy: new SnakeNamingStrategy(),
};

import { AuthGuard } from '@nestjs/passport';

// REF: https://stackoverflow.com/questions/56173298/optional-authentication-in-nest-js-with-nestjs-passport
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleRequest(err: any, user: any, info: any, context: any) {
        return user;
    }
}

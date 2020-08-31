import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

export const PROTECTED_ROUTES = {
    createOneBase: {
        decorators: [ApiBearerAuth(), UseGuards(JwtAuthGuard)],
    },
    updateOneBase: {
        decorators: [ApiBearerAuth(), UseGuards(JwtAuthGuard)],
    },
    replaceOneBase: {
        decorators: [ApiBearerAuth(), UseGuards(JwtAuthGuard)],
    },
    deleteOneBase: {
        decorators: [ApiBearerAuth(), UseGuards(JwtAuthGuard)],
    },
    createManyBase: {
        decorators: [ApiBearerAuth(), UseGuards(JwtAuthGuard)],
    },
};

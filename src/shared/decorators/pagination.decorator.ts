import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { toSafeInteger } from '../utils';

export const PAGE_QUERY_METADATA = {
    name: 'page',
    required: false,
    description: 'Page portion of resources',
    type: Number,
};

export const LIMIT_QUERY_METADATA = {
    name: 'limit',
    required: false,
    description: 'Limit amount of resources. Default to 25',
    type: Number,
};

export interface IPagination {
    page: number;
    limit: number;
    offset: number;
}

export const Pagination = createParamDecorator((data: { pageProperty?: string; limitProperty?: string }, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const { pageProperty = 'page', limitProperty = 'limit' } = data || {};
    const page = toSafeInteger(req.query[pageProperty], 1);
    const limit = toSafeInteger(req.query[limitProperty], 25);
    return {
        page,
        limit,
        offset: (page - 1) * limit,
    } as IPagination;
});

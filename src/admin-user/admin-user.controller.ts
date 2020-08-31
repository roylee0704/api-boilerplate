import { Controller, UseGuards, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController, Override, ParsedRequest, ParsedBody, CrudRequest } from '@nestjsx/crud';
import { CurrentUser, CustomApiHeaders } from '@shared/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAdminUserDto, UpdateAdminUserDto } from './admin-user.dto';
import { AdminUser } from './admin-user.entity';
import { AdminUserService } from './admin-user.service';

@ApiTags('admin-user')
@CustomApiHeaders()
@Controller('admin/users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Crud({
    model: {
        type: AdminUser,
    },
    query: {
        join: {
            roles: {
                eager: true,
            },
        },
    },
})
export class AdminUserController implements CrudController<AdminUser> {
    constructor(public service: AdminUserService) {}

    @Override()
    createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: CreateAdminUserDto) {
        return this.service.createOne(req, dto);
    }

    @Override()
    replaceOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UpdateAdminUserDto) {
        return this.service.overrideReplaceOne(req, dto);
    }

    @Get('current')
    getCurrentUserProfile(@CurrentUser('sub') id: string) {
        return this.service.findOne(id);
    }
}

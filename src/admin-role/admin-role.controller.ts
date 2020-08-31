import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CustomApiHeaders } from '@shared/decorators';
import { AdminRole } from './admin-role.entity';
import { AdminRoleService } from './admin-role.service';

@ApiTags('admin-role')
@CustomApiHeaders()
@Controller('admin/roles')
@ApiBearerAuth()
@Crud({
    model: {
        type: AdminRole,
    },
    params: {
        id: {
            field: 'id',
            type: 'number',
            primary: true,
        },
    },
    query: {
        join: {
            permissions: {
                eager: true,
            },
        },
    },
})
export class AdminRoleController implements CrudController<AdminRole> {
    constructor(public service: AdminRoleService) {}
}

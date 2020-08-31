import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController, Crud } from '@nestjsx/crud';
import { CustomApiHeaders } from '@shared/decorators';
import { AdminPermission } from './admin-permission.entity';
import { AdminPermissionService } from './admin-permission.service';

@ApiTags('admin-permission')
@CustomApiHeaders()
@Controller('admin/permissions')
@Crud({
    model: {
        type: AdminPermission,
    },
})
export class AdminPermissionController implements CrudController<AdminPermission> {
    constructor(public service: AdminPermissionService) {}
}

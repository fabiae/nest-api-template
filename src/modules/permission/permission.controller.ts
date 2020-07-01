import { 
    Controller, 
    Post, 
    Param, 
    ParseIntPipe, 
    Body, 
    UseGuards, 
    Delete,
    Put,
    Get,
    Query
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { CreatePermission } from './dto/create-permission.dto'
import { CreatePermissionService } from './services/create.permission.service'
import { RolesGuard } from '../../@common/guards/roles.guard'
import { RolesDecorator } from '../../@common/decorators/roles.decorator'
import { Roles } from '../../@common/enums/roles.enum'
import { DeletePermissionService } from './services/delete.permission.service'
import { UpdatePermissionService } from './services/update.permission.dto'
import { States } from '../../@common/enums/states.enum'
import { GetPermissionService } from './services/get.permission.service'
import { GetPermission } from './dto/get-permission.dto'

@Controller('permission')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@RolesDecorator(Roles.ADMIN)
export class PermissionController {

    constructor(
        private readonly createPermissionService: CreatePermissionService,
        private readonly deletePermissionService: DeletePermissionService,
        private readonly updatePermissionService: UpdatePermissionService,
        private readonly getPermissionService: GetPermissionService
    ){}

    @Get('/all')
    getAll(@Query("state") state: States) {
        return this.getPermissionService.getAll(state)
    }

    @Get()
    getPermission(@Query() params: GetPermission) {
        return this.getPermissionService.getPermission(params)
    }

    @Post()
    createPermission(@Body() body: CreatePermission){
        return this.createPermissionService.createPermission(body)
    }

    @Delete("/:permissionId")
    deletePermission(
        @Param("permissionId", ParseIntPipe) permissionId: number
    ){
        return this.deletePermissionService.deletePermission(permissionId)
    }

    @Put("/set-state/:permissionId")
    setState(
        @Param("permissionId", ParseIntPipe) permissionId: number
    ){
        return this.updatePermissionService.setState(permissionId)
    }
}

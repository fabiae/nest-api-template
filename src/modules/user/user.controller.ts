import { 
    Controller, 
    Get, 
    Query, 
    UseGuards, 
    Req, 
    Post, 
    Body, 
    Put, 
    Delete
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { GetUserService } from './services/get.user.service'
import { States } from '../../@common/enums/states.enum'
import { RolesGuard } from '../../@common/guards/roles.guard'
import { RolesDecorator } from '../../@common/decorators/roles.decorator'
import { Roles } from '../../@common/enums/roles.enum'
import { GetPermissionsService } from './services/get.permissions.service'
import { AddPermissionService } from './services/add.permission.service'
import { UserRole } from './dto/user-role.dto'
import { AddRoleService } from './services/add.role.service'
import { RemoveRoleService } from './services/remove.role.service'
import { RemovePermissionService } from './services/remove.permission.service'
import { UserPermission } from './dto/user-permission.dto'
import { ChangeLanguage } from './dto/change-language.dto'
import { ChangeLanguageService } from './services/change.language.service'

@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
    constructor(
        private readonly getUserService: GetUserService,
        private readonly permissionsService: GetPermissionsService,
        private readonly addPermissionService: AddPermissionService,
        private readonly addRoleService: AddRoleService,
        private readonly removeRoleService: RemoveRoleService,
        private readonly removePermissionService: RemovePermissionService,
        private readonly changeLanguageService: ChangeLanguageService
    ){}

    @Get()
    @RolesDecorator(Roles.ADMIN)
    getUsers(@Query("state") state: States){
        return this.getUserService.getAllUsers(state)
    }

    @Put('/change-language')
    changeLanguage(@Req() req, @Body() body: ChangeLanguage){
        return this.changeLanguageService.changeLanguage(req.user.id, body)
    }

    @Get('/permissions')
    getPermissions(@Req() req){
        return this.permissionsService.getPermissions(req.user.id)
    }

    @Post('/add-permission')
    @RolesDecorator(Roles.ADMIN, Roles.SUPER_ADMIN)
    addPermission(@Req() req, @Body() body: UserPermission){
        return this.addPermissionService.addPermission(body)
    }

    @Put('/e-d-permission')
    @RolesDecorator(Roles.ADMIN, Roles.SUPER_ADMIN)
    enableDisablePermission(@Body() body: UserPermission){
        return this.removePermissionService.enableDisable(body)
    }

    @Delete('/remove-permission')
    @RolesDecorator(Roles.ADMIN)
    removePermission(@Body() body: UserPermission){
        return this.removePermissionService.removePermission(body)
    }

    @Post('/add-role')
    @RolesDecorator(Roles.ADMIN, Roles.SUPER_ADMIN)
    addRole(@Req() req, @Body() body: UserRole){
        return this.addRoleService.addRole(body)
    }

    @Put('/e-d-role')
    @RolesDecorator(Roles.ADMIN, Roles.SUPER_ADMIN)
    enableDisableRole(@Body() body: UserRole){
        return this.removeRoleService.enableDisable(body)
    }

    @Delete('/remove-role')
    @RolesDecorator(Roles.ADMIN, Roles.SUPER_ADMIN)
    removeRole(@Body() body: UserRole){
        return this.removeRoleService.removeRole(body)
    }
}

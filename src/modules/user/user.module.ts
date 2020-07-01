import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller'
import { User } from '../../entities/example/user.entity'
import { GetUserService } from './services/get.user.service'
import { GetPermissionsService } from './services/get.permissions.service'
import { UserRoles } from '../../entities/example/userRoles.entity'
import { UserPermissions } from '../../entities/example/userPermissions.entity'
import { AddPermissionService } from './services/add.permission.service'
import { RemovePermissionService } from './services/remove.permission.service'
import { PermissionModule } from '../permission/permission.module'
import { AddRoleService } from './services/add.role.service'
import { RemoveRoleService } from './services/remove.role.service'
import { RoleModule } from '../role/role.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRoles, UserPermissions]),
    PermissionModule,
    RoleModule
  ],
  controllers: [UserController],
  providers: [
    GetUserService,
    GetPermissionsService,
    AddPermissionService,
    RemovePermissionService,
    AddRoleService,
    RemoveRoleService
  ]
})
export class UserModule {}

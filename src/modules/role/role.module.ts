import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Role } from '../../entities/example/role.entity'
import { RoleController } from './role.controller'
import { GetRoleService } from './services/get.role.service'
import { CreateRoleService } from './services/create.role.service'
import { UpdateRoleService } from './services/update.role.service'
import { DeleteRoleService } from './services/delete.role.service'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [
    GetRoleService,
    CreateRoleService,
    UpdateRoleService,
    DeleteRoleService
  ],
  exports: [GetRoleService]
})
export class RoleModule {}

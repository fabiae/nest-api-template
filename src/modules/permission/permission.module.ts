import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Permission } from '../../entities/example/permission.entity'
import { PermissionController } from './permission.controller'
import { CreatePermissionService } from './services/create.permission.service'
import { DeletePermissionService } from './services/delete.permission.service'
import { UpdatePermissionService } from './services/update.permission.dto'
import { GetPermissionService } from './services/get.permission.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission])
  ],
  controllers: [PermissionController],
  providers: [
    CreatePermissionService,
    DeletePermissionService,
    UpdatePermissionService,
    GetPermissionService
  ],
  exports: [GetPermissionService]
})
export class PermissionModule {}

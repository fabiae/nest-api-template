import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Permission } from "../../../entities/example/permission.entity"
import { CreatePermission } from "../dto/create-permission.dto"

@Injectable()
export class CreatePermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ){}

    async createPermission( body: CreatePermission){
        const permission = await this.permissionRepository.save({ name: body.name })
        return permission
    }
}
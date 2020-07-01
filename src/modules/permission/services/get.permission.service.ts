import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Permission } from "../../../entities/example/permission.entity"
import { States } from "../../../@common/enums/states.enum"
import { GetPermission } from "../dto/get-permission.dto"

@Injectable()
export class GetPermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ){}

    async getAll(state: States): Promise<Permission[]> {
        const condition = state ? { state } : { }
        const languages = await this.permissionRepository.find(condition)
        return languages
    }
    
    async getPermission( params: GetPermission ): Promise<Permission> {
        const condition = params.state ? { state: params.state } : { }
        params.id ? condition['id'] = params.id : condition['name'] = params.name
        const language = await this.permissionRepository.findOne(condition)
        if (!language)
          throw new NotFoundException('Permission does not exist')
        return language
    }
}
import { Injectable, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Permission } from "../../../entities/example/permission.entity"
import { States } from "../../../@common/enums/states.enum"

@Injectable()
export class UpdatePermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ){}

    async setState( permissionId: number){
        const permission = await this.permissionRepository.findOne({
            id: permissionId
        })
        if(!permission)
            throw new BadRequestException("this permission does not exist")
        permission.state = permission.state === States.ACTIVE ? States.INACTIVE : States.ACTIVE
        await this.permissionRepository.save(permission)
        return { ok: true }
    }
}
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Permission } from "../../../entities/example/permission.entity"

@Injectable()
export class DeletePermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ){}

    async deletePermission(permissionId: number){
        const deletedPermision = await this.permissionRepository.delete({ 
            id: permissionId
        })
        if(deletedPermision.affected === 1)
            return { delete: 'SUCCESS' }
        return { delete: 'FAILED' }
    }
}
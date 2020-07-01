import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Permission } from "../../entities/example/permission.entity"

export const PERMISSIONS = [
    { name: 'ALL' },
    { name: 'CREATE' },
    { name: 'READE' },
    { name: 'DELETE' },
    { name: 'UPDATE' },
    { name: 'SET-STATE' }
]

export class PermissionDefault {
    constructor(
        @InjectRepository(Permission)
        private readonly repository: Repository<Permission>
    ){
        PERMISSIONS.map(permission => this.create(permission))
    }

    async create(_object: any){
        const _new = this.repository.create(_object)

        const isExist = await this.repository.findOne({ where: { name: _object.name }})
        if(isExist)
            return

        return this.repository.save(_new)
    }
}
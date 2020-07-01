import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Role } from "../../../entities/example/role.entity"
import { CreateRole } from "../dto/create-role.dto"

@Injectable()
export class CreateRoleService {
    constructor(
        @InjectRepository(Role) 
        private readonly roleRepository: Repository<Role>
    ){}

    async createRole(body: CreateRole): Promise<Role> {
        const savedRole = await this.roleRepository.save(body)
        return savedRole
    }
}
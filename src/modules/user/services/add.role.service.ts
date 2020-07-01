import { Injectable, BadRequestException, ConflictException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { UserRoles } from "../../../entities/example/userRoles.entity"
import { GetRoleService } from "../../role/services/get.role.service"
import { User } from "../../../entities/example/user.entity"
import { UserRole } from "../dto/user-role.dto"

@Injectable()
export class AddRoleService {
    constructor(
        @InjectRepository(UserRoles)
        private readonly userRolesRepository: Repository<UserRoles>,
        private readonly getRoleservice: GetRoleService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async addRole(body: UserRole){
        const { userId, roleId } = body
        const user = await this.userRepository.findOne(userId)
        if(!user)
            throw new BadRequestException('user does not esxist')
        const role = await this.getRoleservice.getRole({ id: roleId })

        const existRole = await this.userRolesRepository.findOne({ user, role })
        if(existRole)
            throw new ConflictException('this user already assigned role')
        
        await this.userRolesRepository.save({ user, role })
        return { assign: 'SUCCESS' }
    }
}
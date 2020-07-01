import { Injectable, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { UserRoles } from "../../../entities/example/userRoles.entity"
import { User } from "../../../entities/example/user.entity"
import { GetRoleService } from "../../role/services/get.role.service"
import { States } from "../../../@common/enums/states.enum"
import { UserRole } from "../dto/user-role.dto"

@Injectable()
export class RemoveRoleService {
    constructor(
        @InjectRepository(UserRoles)
        private readonly userRolesRepository: Repository<UserRoles>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly getRoleservice: GetRoleService,
    ){}

    async removeRole(body: UserRole){
        const { userId, roleId } = body
        const user = await this.userRepository.findOne(userId)
        if(!user)
            throw new  BadRequestException('user does not esxist')

        const role = await this.getRoleservice.getRole({ id: roleId })

        const userRoles = await this.userRolesRepository.delete({ role, user })
        if(userRoles.affected === 1)
            return { delete: 'SUCCESS' }
        return { delete: 'FAILED' }
    } 

    async enableDisable(body: UserRole){
        const { userId, roleId } = body

        const user = await this.userRepository.findOne(userId)
        if(!user)
            throw new  BadRequestException('user does not esxist')

        const role = await this.getRoleservice.getRole({ id: roleId })

        const existRole = await this.userRolesRepository.findOne({ user, role  })
        if(!existRole)
            throw new BadRequestException('this user is not assigned this role')
        
        existRole.state = existRole.state === States.ACTIVE ? States.INACTIVE : States.ACTIVE
        await this.userRolesRepository.save(existRole)

        return { process: 'SUCCESS' }
    }
}
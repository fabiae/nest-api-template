import { Injectable, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { UserPermissions } from "../../../entities/example/userPermissions.entity"
import { UserRoles } from "../../../entities/example/userRoles.entity"
import { GetPermissionService } from "../../permission/services/get.permission.service"
import { States } from "../../../@common/enums/states.enum"
import { UserPermission } from "../dto/user-permission.dto"

@Injectable()
export class AddPermissionService {
    constructor(
        @InjectRepository(UserPermissions)
        private readonly userPermissionsRepository: Repository<UserPermissions>,
        @InjectRepository(UserRoles)
        private readonly userRolesRepository: Repository<UserRoles>,
        private readonly getPermissionService: GetPermissionService
    ){}

    async addPermission(body: UserPermission){
        const { userId, roleId, permissionId } = body
        const userRoles = await this.userRolesRepository.findOne({
            user: { id: userId },
            role: { id: roleId }
        })
        if(!userRoles)
            throw new BadRequestException('This user does not have the registered role')
        
        const permission = await this.getPermissionService.getPermission({ id: permissionId, state: States.ACTIVE })
        if(!permission)
            throw new BadRequestException('this permission does not exist or is not active')

        await this.userPermissionsRepository.save({ userRoles, permission })

        return { add: 'SUCCESS' }
    } 
}
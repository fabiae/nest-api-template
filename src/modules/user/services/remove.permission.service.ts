import { Injectable, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { UserPermissions } from "../../../entities/example/userPermissions.entity"
import { UserRoles } from "../../../entities/example/userRoles.entity"
import { GetPermissionService } from "../../permission/services/get.permission.service"
import { States } from "../../../@common/enums/states.enum"
import { UserPermission } from "../dto/user-permission.dto"

@Injectable()
export class RemovePermissionService {
    constructor(
        @InjectRepository(UserPermissions)
        private readonly userPermissionsRepository: Repository<UserPermissions>,
        @InjectRepository(UserRoles)
        private readonly userRolesRepository: Repository<UserRoles>,
        private readonly getPermissionService: GetPermissionService
    ){}

    async removePermission(body: UserPermission){
        const { userId, roleId, permissionId } = body

        const permission = await this.getPermissionService.getPermission({ id: permissionId })

        const existRole = await this.userRolesRepository.findOne({ user: { id: userId }, role: { id: roleId } })
        if(!existRole)
            throw new BadRequestException('this user is not assigned this role')

        const userPermission = await this.userPermissionsRepository.delete({ permission, userRoles: existRole })
        
        if(userPermission.affected === 1)
            return { delete: 'SUCCESS' }
        return { delete: 'FAILED' }
    } 

    async enableDisable(body: UserPermission){
        const { userId, roleId, permissionId } = body

        const permission = await this.getPermissionService.getPermission({ id: permissionId })

        const existRole = await this.userRolesRepository.findOne({ user: { id: userId }, role: { id: roleId } })
        if(!existRole)
            throw new BadRequestException('this user is not assigned this role')
        
        const existPermission = await this.userPermissionsRepository.findOne({ permission, userRoles: existRole })
        if(!existPermission)
            throw new BadRequestException('this user is no assigned this permission')

        existPermission.state = existPermission.state === States.ACTIVE ? States.INACTIVE : States.ACTIVE
        await this.userPermissionsRepository.save(existPermission)

        return { process: 'SUCCESS' }
    }
}
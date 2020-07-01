import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"

@Injectable()
export class PermissionsGuard implements CanActivate {

    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const permissions = this.reflector.get<string[]>('permissions', context.getHandler())
        if(!permissions)
            return true

        const request = context.switchToHttp().getRequest()
        const { user } = request

        const matchPermissions = () => user.permissions.some(permission => permissions.includes(permission))//many to many user-roles

        return user && user.permissions && matchPermissions()
    }
}
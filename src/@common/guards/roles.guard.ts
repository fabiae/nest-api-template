import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if(!roles)
            return true

        const request = context.switchToHttp().getRequest()
        const { user } = request

        const matchRoles = () => user.roles.some(role => roles.includes(role))//many to many user-roles
        //const matchRoles = () => roles.includes(user.role) one to many user-roles

        return user && user.roles && matchRoles()
    }
}
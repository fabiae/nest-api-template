import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Strategy, ExtractJwt } from 'passport-jwt'

import { User } from '../../entities/example/user.entity'
import { ValidateToken } from '../utils/validateToken.service'
import { Roles } from '../enums/roles.enum'

interface JwtPayload {
    id: number,
    username: string,
    email: string,
    roles: Roles[],
    permissions: string[],
    iat?: Date
}

export function getToken(user: User) {
    let permissions
    user.userRoles.forEach(u_r => {
        permissions = u_r.userPermissions.map(u_p => u_p.permission.name)
    })

    const payload: JwtPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.userRoles.map(userRole => userRole.role.name as Roles),
        //roles: user.roles.map(role => role.name as Roles)
        permissions
    }
    return payload
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    
    constructor(
        private readonly validateToken: ValidateToken,
        private readonly configService: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_KEY')
        })
    }

    async validate(payload: JwtPayload): Promise<JwtPayload> {
        await this.validateToken.validateToken(payload)
        return payload
    }

}
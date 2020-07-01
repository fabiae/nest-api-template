import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { JwtService } from "@nestjs/jwt"

import { User } from "../../../entities/example/user.entity"
import { BcryptService } from "../../../@common/utils/bcrypt.service"
import { SignIn } from "../dto/signin.dto"
import { getToken } from "../../../@common/strategies/jwt.strategy"
import { States } from "../../../@common/enums/states.enum"

@Injectable()
export class SignInService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService
    ) { }

    async signIn(body: SignIn): Promise<object> {
        const { username, password } = body

        const user = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.id', 'user.username', 'user.email', 'user.password'])
            .addSelect(['roles.id', 'role.name', 'permissions.id', 'permission.id', 'permission.name'])
            .leftJoin('user.userRoles', 'roles', "roles.state = :stat", { stat: States.ACTIVE })
            .leftJoin('roles.userPermissions', 'permissions', 'permissions.state = :stat', { stat: States.ACTIVE })
            .leftJoin('permissions.permission', 'permission', 'permission.state = :stat', { stat: States.ACTIVE })
            .leftJoin('roles.role', 'role', 'role.state = :stat', { stat: States.ACTIVE })
            .where('user.username = :username and user.state = :state', { 
                username, state: States.ACTIVE
            })
            .getOne()
        
        if (!user) {
            throw new NotFoundException('the user entered is not registered')
        }

        const isMatch = this.bcryptService.match(password, user.password)
        if (!isMatch) {
            throw new UnauthorizedException('invalidate password')
        }

        const token = this.jwtService.sign(getToken(user))
        return { token, ok: true }
    }
}
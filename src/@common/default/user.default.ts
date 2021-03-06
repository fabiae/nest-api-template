import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { User } from "../../entities/example/user.entity"
import { Roles } from "../enums/roles.enum"
import { BcryptService } from "../utils/bcrypt.service"
import { UserRoles } from "../../entities/example/userRoles.entity"
import { Role } from "../../entities/example/role.entity"
import { Language } from "../../entities/example/language.entity"

export const USERS = [
    { 
        username: 'admin', 
        email: 'admin@email.com', 
        password: 'admin', 
        role: Roles.ADMIN
    },
    {
        username: 'general', 
        email: 'general@email.com', 
        password: 'general', 
        role: Roles.GENERAL
    }
]

export class UserDefault {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
        @InjectRepository(UserRoles)
        private readonly rolesRepository: Repository<UserRoles>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Language)
        private readonly languageRepository: Repository<Language>,
        private readonly bcryptService: BcryptService
    ){
        setTimeout(() => {
            USERS.map(user => this.create(user))
        }, 1000)       
    }

    async create(_object: any){
        const { username, email, password, role } = _object

        const isExist = await this.repository.findOne({ where: { username: _object.username }})
        if(isExist)
            return

        const _new = await this.repository.save({
            username,
            email,
            password: this.bcryptService.encryption(password)
        })

        _new.userRoles = [await this.rolesRepository.save({
            user: _new,
            role: await this.roleRepository.findOne({ name: role })
        })]

        _new.language = await this.languageRepository.findOne({ name: 'SPANISH' })

        return this.repository.save(_new)
    }
}
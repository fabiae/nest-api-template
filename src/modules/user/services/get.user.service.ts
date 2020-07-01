import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { User } from "../../../entities/example/user.entity"
import { States } from "../../../@common/enums/states.enum"


@Injectable()
export class GetUserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async getAllUsers(state: States){
        const condition = state ?  { state } : { }
        const users = await this.userRepository.findAndCount(condition)
        return users
    }
}
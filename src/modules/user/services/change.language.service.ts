import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { GetLanguageService } from "../../language/services/get.language.service"
import { States } from "../../../@common/enums/states.enum"
import { ChangeLanguage } from "../dto/change-language.dto"
import { User } from "../../../entities/example/user.entity"

@Injectable()
export class ChangeLanguageService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly getLanguageService: GetLanguageService,
    ){}

    async changeLanguage(id: number, body: ChangeLanguage): Promise<object> {
        const user = await this.userRepository.findOne({ where:{ id, state: States.ACTIVE }, relations: ['language'] })

        const language = await this.getLanguageService.getLanguage({ name: body.name, state: States.ACTIVE })
        
        user.language = language
        await this.userRepository.save(user)
        return {
          update: 'success',
          ok: true,
        }
    }
}
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Language } from "../../../entities/example/language.entity"
import { GetLanguageService } from "./get.language.service"
import { UpdateLanguage } from "../dto/update-language.dto"
import { States } from "../../../@common/enums/states.enum"

@Injectable()
export class UpdateLanguageService {
    constructor(
        @InjectRepository(Language)
        private readonly languageRepository: Repository<Language>,
        private readonly getLanguageService: GetLanguageService
    ){}

    async updateLanguage(id: number, body: UpdateLanguage): Promise<object> {
        await this.getLanguageService.getLanguage({ id })
        const updatedLanguage = await this.languageRepository.update(id, body)
        if(updatedLanguage.affected === 1)
            return { update: 'SUCCESS' }
        return { update: 'FAILED' }
    }

    async setState(id: number): Promise<object> {
        const language = await  this.getLanguageService.getLanguage({ id })
        language.state = language.state === States.ACTIVE ? States.INACTIVE : States.ACTIVE
        await this.languageRepository.save(language)
        return { ok: true }
    }
}
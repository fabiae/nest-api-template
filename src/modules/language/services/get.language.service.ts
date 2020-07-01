import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Language } from "../../../entities/example/language.entity"
import { States } from "../../../@common/enums/states.enum"
import { GetLanguage } from "../dto/get-language.dto"

@Injectable()
export class GetLanguageService {
    constructor(
        @InjectRepository(Language)
        private readonly languageRepository: Repository<Language>
    ){}

    async getAll(state: States): Promise<Language[]> {
        const condition = state ? { state } : { }
        const languages = await this.languageRepository.find(condition)
        return languages
    }
    
    async getLanguage( params: GetLanguage ): Promise<Language> {
        const condition = params.state ? { state: params.state } : { }
        params.id ? condition['id'] = params.id : condition['name'] = params.name
        const language = await this.languageRepository.findOne(condition)
        if (!language)
          throw new NotFoundException('Language does not exist')
        return language
    }
}
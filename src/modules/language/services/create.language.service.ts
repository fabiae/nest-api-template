import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { CreateLanguage } from "../dto/create-language.dto"
import { Language } from "../../../entities/example/language.entity"

@Injectable()
export class CreateLanguageService {
    constructor(
        @InjectRepository(Language)
        private readonly languageRepository: Repository<Language>
    ){}

    async createLanguage(body: CreateLanguage): Promise<Language> {
        const savedLanguage = await this.languageRepository.save(body)
        return savedLanguage
    }
}
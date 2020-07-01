import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Language } from "../../entities/example/language.entity"

export const LANGUAGES = [
    { name: 'SPANISH', key: 'es' },
    { name: 'ENGLISH', key: 'en' }
]

export class LanguageDefault {
    constructor(
        @InjectRepository(Language)
        private readonly repository: Repository<Language>
    ){
        LANGUAGES.map(language => this.create(language))
    }

    async create(_object: any){
        const _new = this.repository.create(_object)

        const isExist = await this.repository.findOne({ where: { key: _object.key }}) 
        if(isExist)
            return
         
        return this.repository.save(_new)
    }
}
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Profile } from "../../../entities/example/profile.entity"
import { GetProfileService } from "./get.profile.service"
import { GetLanguageService } from "../../language/services/get.language.service"
import { States } from "../../../@common/enums/states.enum"
import { ChangeLanguage } from "../dto/change-language.dto"

@Injectable()
export class ChangeLanguageService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
        private readonly getLanguageService: GetLanguageService,
        private readonly getProfileService: GetProfileService
    ){}

    async setLanguage(id: number, body: ChangeLanguage): Promise<object> {
        const profile = await this.getProfileService.getProfile(id)

        const language = await this.getLanguageService.getLanguage({ name: body.name, state: States.ACTIVE })
        
        profile.language = language
        await this.profileRepository.save(profile)
        return {
          update: 'success',
          ok: true,
        }
    }
}
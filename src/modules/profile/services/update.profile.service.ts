import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Profile } from "../../../entities/example/profile.entity"
import { UpdateProfile } from "../dto/update-profile.dto"
import { GetProfileService } from "./get.profile.service"
import { GetLanguageService } from "../../language/services/get.language.service"

@Injectable()
export class UpdateProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
        private readonly getProfileService: GetProfileService,
        private readonly getLanguageService: GetLanguageService
    ){}

    async updateProfile(id: number, body: UpdateProfile): Promise<object> {
        const profile = await this.getProfileService.getProfile(id)
        for (const key in body) {
          profile[key] = body[key]
        }
        const languageDefault = await this.getLanguageService.getLanguage({ name: 'SPANISH' })
        profile.language = languageDefault
        await this.profileRepository.save(profile)
        return { update: 'success', ok: true }
    }
}
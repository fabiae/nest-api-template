import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Profile } from "../../../entities/example/profile.entity"
import { UpdateProfile } from "../dto/update-profile.dto"
import { GetProfileService } from "./get.profile.service"

@Injectable()
export class UpdateProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
        private readonly getProfileService: GetProfileService,
    ){}

    async updateProfile(id: number, body: UpdateProfile): Promise<object> {
        const profile = await this.getProfileService.getProfile(id)
        for (const key in body) {
          profile[key] = body[key]
        }
        await this.profileRepository.save(profile)
        return { update: 'success', ok: true }
    }
}
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ConfigService } from "@nestjs/config"

import { Photo } from "../../../entities/example/photo.entity"
import { Profile } from "../../../entities/example/profile.entity"
import { GetProfileService } from "./get.profile.service"

@Injectable()
export class SetPhotoService {

    constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
        private readonly getProfileService: GetProfileService,
        private readonly configService: ConfigService
    ){}

    async setPhotoProfile(id: number, photo: any): Promise<object> {
        const profile = await this.getProfileService.getProfile(id)
  
        const url = `${this.configService.get('urlPhoto.url')}/${photo.filename}`
  
        const photoProfile = await this.photoRepository.save({ 
          url, 
          description: `photo profile of ${profile.firstName}`, 
          typePhoto: 'profile'
        })
        profile.photo = photoProfile
        await this.profileRepository.save(profile)
        return { uploadPhoto: 'SUCCESS', ok: true }
    }
}
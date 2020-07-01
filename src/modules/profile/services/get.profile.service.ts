import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Profile } from "../../../entities/example/profile.entity"

@Injectable()
export class GetProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ){}

    async getProfile(id: number): Promise<Profile> {
        const profile = await this.profileRepository
          .createQueryBuilder('profile')
          .innerJoin('profile.user', 'user', 'user.id = :id', { id })
          .leftJoinAndSelect('profile.photo', 'photo')
          .getOne()
        return profile
    }
}
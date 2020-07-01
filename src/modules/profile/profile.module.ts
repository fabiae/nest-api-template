import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProfileController } from './profile.controller'
import { Profile } from '../../entities/example/profile.entity'
import { GetProfileService } from './services/get.profile.service'
import { UpdateProfileService } from './services/update.profile.service'
import { Photo } from '../../entities/example/photo.entity'
import { SetPhotoService } from './services/set.photo.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, Photo]),
  ],
  controllers: [ProfileController],
  providers: [
    GetProfileService,
    UpdateProfileService,
    SetPhotoService
  ]
})
export class ProfileModule {}

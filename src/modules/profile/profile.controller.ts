import { 
    Controller, 
    UseGuards, 
    Get, 
    Req, 
    Post, 
    Body, 
    Put, 
    UploadedFile, 
    UseInterceptors 
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'

import { GetProfileService } from './services/get.profile.service'
import { RolesGuard } from '../../@common/guards/roles.guard'
import { UpdateProfile } from './dto/update-profile.dto'
import { UpdateProfileService } from './services/update.profile.service'
import { SetPhotoService } from './services/set.photo.service'

@Controller('profile')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProfileController {
    constructor(
        private readonly getProfileService: GetProfileService,
        private readonly updateProfileService: UpdateProfileService,
        private readonly setPhotoService: SetPhotoService
    ){}

    @Get()
    getProfile(@Req() req) {
        return this.getProfileService.getProfile(req.user.id)
    }

    @Post()
    updateProfile(@Req() req, @Body() body: UpdateProfile ){
        return this.updateProfileService.updateProfile(req.user.id, body)
    }

    @Put('/set-photo')
    @UseInterceptors(FileInterceptor('photo'))
    setPhoto(@Req() req, @UploadedFile() photo){
        return this.setPhotoService.setPhotoProfile(req.user.id, photo)
    }   

}

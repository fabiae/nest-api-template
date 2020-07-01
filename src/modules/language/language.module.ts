import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LanguageController } from './language.controller'
import { Language } from '../../entities/example/language.entity'
import { GetLanguageService } from './services/get.language.service'
import { CreateLanguageService } from './services/create.language.service'
import { UpdateLanguageService } from './services/update.language.service'
import { DeleteLanguageService } from './services/delete.language.service'

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [
    GetLanguageService,
    CreateLanguageService,
    UpdateLanguageService,
    DeleteLanguageService
  ],
  exports: [GetLanguageService]
})
export class LanguageModule {}

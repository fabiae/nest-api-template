import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommonModule } from './@common/common.module'
import { AppController } from './app.controller'
import { AuthModule } from './modules/auth/auth.module'
import { RoleModule } from './modules/role/role.module'
import { LanguageModule } from './modules/language/language.module'
import { UserModule } from './modules/user/user.module'
import { ProfileModule } from './modules/profile/profile.module'
import { PermissionModule } from './modules/permission/permission.module'
import sendgridConfig from './@common/config/sendgrid.config'
import typeormConfig from './@common/config/typeorm.config'
import urlPhotoConfig from './@common/config/url-photo.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [typeormConfig, sendgridConfig, urlPhotoConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm.example') 
    }),
    CommonModule,
    AuthModule,
    RoleModule,
    LanguageModule,
    UserModule,
    ProfileModule,
    PermissionModule
  ],
  controllers: [AppController],
})
export class AppModule {}

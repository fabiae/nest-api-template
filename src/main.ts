import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const PREFIX = configService.get('PREFIX')
  const PORT = configService.get('PORT')

  app.setGlobalPrefix(PREFIX)
  app.enableCors()//delete in production
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT)
}
bootstrap()

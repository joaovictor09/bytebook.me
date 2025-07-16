import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  await app.listen(port ?? 3333)
}

bootstrap()

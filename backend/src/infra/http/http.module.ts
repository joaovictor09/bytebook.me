import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { RegisterUserUseCase } from '@/use-cases/users/register-user'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController],
  providers: [RegisterUserUseCase],
})
export class HttpModule {}

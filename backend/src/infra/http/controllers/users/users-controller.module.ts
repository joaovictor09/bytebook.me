import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AuthenticateUseCase } from '@/use-cases/users/authenticate'
import { RegisterUserUseCase } from '@/use-cases/users/register-user'
import { Module } from '@nestjs/common'
import { AuthenticateController } from './authenticate.controller'
import { CreateAccountController } from './create-account.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController, AuthenticateController],
  providers: [RegisterUserUseCase, AuthenticateUseCase],
})
export class UsersControllerModule {}

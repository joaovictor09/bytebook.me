import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AuthenticateUseCase } from '@/use-cases/users/authenticate'
import { RegisterUserUseCase } from '@/use-cases/users/register-user'
import { Module } from '@nestjs/common'
import { AuthenticateController } from './authenticate.controller'
import { CreateAccountController } from './create-account.controller'
import { GetMeController } from './get-me.controller'
import { FindUserByIdUseCase } from '@/use-cases/users/find-user-by-id'
import { LogoutController } from './logout.controller'
import { GetUserByIdController } from './get-user-by-id.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    GetMeController,
    LogoutController,
    GetUserByIdController,
  ],
  providers: [RegisterUserUseCase, AuthenticateUseCase, FindUserByIdUseCase],
})
export class UsersControllerModule {}

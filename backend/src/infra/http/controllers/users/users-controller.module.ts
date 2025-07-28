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
import { GetUserByUsernameController } from './get-user-by-username.controller'
import { FindUserByUsernameUseCase } from '@/use-cases/users/find-user-by-username'
import { GetUserDetailsByUsername } from '@/use-cases/users/get-user-details-by-username'
import { GetUserDetailsByUsernameController } from './get-user-details-by-username.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    GetMeController,
    LogoutController,
    GetUserByUsernameController,
    GetUserDetailsByUsernameController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUseCase,
    FindUserByIdUseCase,
    FindUserByUsernameUseCase,
    GetUserDetailsByUsername,
  ],
})
export class UsersControllerModule {}

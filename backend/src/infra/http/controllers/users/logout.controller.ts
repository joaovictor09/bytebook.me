import { Public } from '@/infra/auth/public'
import { Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'

@Public()
@Controller()
export class LogoutController {
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
    return { message: 'Logged out successfully' }
  }
}

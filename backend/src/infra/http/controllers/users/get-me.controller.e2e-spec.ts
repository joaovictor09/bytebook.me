import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Get Me (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  const userId = randomUUID()

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()

    await prisma.user.create({
      data: {
        id: userId,
        name: 'Usuário Teste',
        email: 'user.teste@example.com',
        passwordHash: await hash('123456', 8),
      },
    })
  })

  afterAll(async () => {
    await app.close()
  })

  it('[GET] /me - should return current user data', async () => {
    const accessToken = jwt.sign({ sub: userId })

    const response = await request(app.getHttpServer())
      .get('/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(response.body.user).toMatchObject({
      id: userId,
      name: 'Usuário Teste',
      email: 'user.teste@example.com',
    })
  })

  it('[GET] /me - should return 401 if token is missing', async () => {
    await request(app.getHttpServer()).get('/me').expect(401)
  })
})

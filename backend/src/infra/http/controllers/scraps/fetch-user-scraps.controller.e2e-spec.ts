import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Fetch User Scraps (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /scraps/:userId', async () => {
    const senderId = randomUUID()
    const recipientId = randomUUID()

    await prisma.user.create({
      data: {
        id: senderId,
        name: 'Sender',
        email: 'sender@example.com',
        passwordHash: await hash('123456', 8),
      },
    })

    await prisma.user.create({
      data: {
        id: recipientId,
        name: 'Recipient',
        email: 'recipient@example.com',
        passwordHash: await hash('abcdef', 8),
      },
    })

    await prisma.scrap.create({
      data: {
        message: 'Olá, tudo bem?',
        senderId,
        recipientId,
      },
    })

    await prisma.scrap.create({
      data: {
        message: 'Mais um recado!',
        senderId,
        recipientId,
      },
    })

    const accessToken = jwt.sign({ sub: recipientId })

    const response = await request(app.getHttpServer())
      .get(`/scraps/${recipientId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      scraps: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          message: 'Olá, tudo bem?',
          senderId,
          recipientId,
        }),
        expect.objectContaining({
          id: expect.any(String),
          message: 'Mais um recado!',
          senderId,
          recipientId,
        }),
      ]),
    })
  })
})

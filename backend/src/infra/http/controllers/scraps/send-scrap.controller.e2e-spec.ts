import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Send Scrap (E2E)', () => {
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

  test('[POST] /scraps/send/:userId', async () => {
    const senderId = randomUUID()
    const recipientId = randomUUID()

    await prisma.user.create({
      data: {
        id: senderId,
        name: 'Sender User',
        email: 'sender@example.com',
        passwordHash: await hash('123456', 8),
      },
    })

    await prisma.user.create({
      data: {
        id: recipientId,
        name: 'Recipient User',
        email: 'recipient@example.com',
        passwordHash: await hash('abcdef', 8),
      },
    })

    const accessToken = jwt.sign({ sub: senderId })

    const response = await request(app.getHttpServer())
      .post(`/scraps/send/${recipientId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        message: 'Olá, tudo bem?',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      scrap: expect.objectContaining({
        id: expect.any(String),
        message: 'Olá, tudo bem?',
        senderId,
        recipientId,
      }),
    })

    const scrapInDb = await prisma.scrap.findFirst({
      where: { senderId, recipientId },
    })

    expect(scrapInDb).toBeTruthy()
    expect(scrapInDb?.message).toBe('Olá, tudo bem?')
  })
})

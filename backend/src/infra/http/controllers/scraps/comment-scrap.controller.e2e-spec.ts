import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Comment Scrap (E2E)', () => {
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

  test('[POST] /scraps/:scrapId/comment - deve comentar um scrap', async () => {
    const senderId = randomUUID()
    const recipientId = randomUUID()

    // Cria usuários
    await prisma.user.createMany({
      data: [
        {
          id: senderId,
          name: 'User Sender',
          email: 'sender@example.com',
          passwordHash: await hash('123456', 8),
        },
        {
          id: recipientId,
          name: 'User Recipient',
          email: 'recipient@example.com',
          passwordHash: await hash('abcdef', 8),
        },
      ],
    })

    // Cria scrap
    const scrap = await prisma.scrap.create({
      data: {
        message: 'Mensagem original',
        senderId,
        recipientId,
      },
    })

    const accessToken = jwt.sign({ sub: senderId })

    const response = await request(app.getHttpServer())
      .post(`/scraps/${scrap.id}/comment`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        message: 'Comentando aqui!',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      comment: expect.objectContaining({
        id: expect.any(String),
        message: 'Comentando aqui!',
        senderId,
        scrapId: scrap.id,
      }),
    })

    const commentInDb = await prisma.scrapComment.findFirst({
      where: {
        senderId,
        scrapId: scrap.id,
      },
    })

    expect(commentInDb).toBeTruthy()
    expect(commentInDb?.message).toBe('Comentando aqui!')
  })
})

import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Fetch Scrap Comments (E2E)', () => {
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

  test('[GET] /scraps/:scrapId/comments', async () => {
    const senderId = randomUUID()
    const recipientId = randomUUID()

    await prisma.user.createMany({
      data: [
        {
          id: senderId,
          name: 'Sender',
          email: 'sender@example.com',
          passwordHash: await hash('123456', 8),
        },
        {
          id: recipientId,
          name: 'Recipient',
          email: 'recipient@example.com',
          passwordHash: await hash('abcdef', 8),
        },
      ],
    })

    const scrap = await prisma.scrap.create({
      data: {
        message: 'Primeiro recado',
        senderId,
        recipientId,
      },
    })

    await prisma.scrapComment.createMany({
      data: [
        {
          message: 'Comentário 1',
          scrapId: scrap.id,
          senderId,
        },
        {
          message: 'Comentário 2',
          scrapId: scrap.id,
          senderId,
        },
      ],
    })

    const accessToken = jwt.sign({ sub: recipientId })

    const response = await request(app.getHttpServer())
      .get(`/scraps/${scrap.id}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.comments).toHaveLength(2)
    expect(response.body.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'Comentário 1' }),
        expect.objectContaining({ message: 'Comentário 2' }),
      ]),
    )
  })
})

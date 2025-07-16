import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Delete Scrap (E2E)', () => {
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

  test('[DELETE] /scraps/:scrapId', async () => {
    const senderId = randomUUID()
    const recipientId = randomUUID()

    await prisma.user.createMany({
      data: [
        {
          id: senderId,
          name: 'Sender User',
          email: 'sender@example.com',
          passwordHash: await hash('123456', 8),
        },
        {
          id: recipientId,
          name: 'Recipient User',
          email: 'recipient@example.com',
          passwordHash: await hash('abcdef', 8),
        },
      ],
    })

    const scrap = await prisma.scrap.create({
      data: {
        senderId,
        recipientId,
        message: 'Esse scrap será deletado',
      },
    })

    const accessToken = jwt.sign({ sub: senderId })

    const response = await request(app.getHttpServer())
      .delete(`/scraps/${scrap.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)

    const scrapInDb = await prisma.scrap.findUnique({
      where: {
        id: scrap.id,
      },
    })

    expect(scrapInDb).toBeNull()
  })
})

import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

describe('Fetch User Connections (E2E)', () => {
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

  test('[GET] /connections/request', async () => {
    const userId = randomUUID()
    const otherUserId = randomUUID()

    await prisma.user.create({
      data: {
        id: userId,
        name: 'User One',
        email: 'user1@example.com',
        passwordHash: await hash('123456', 8),
      },
    })

    await prisma.user.create({
      data: {
        id: otherUserId,
        name: 'User Two',
        email: 'user2@example.com',
        passwordHash: await hash('abcdef', 8),
      },
    })

    await prisma.connection.create({
      data: {
        senderId: userId,
        recipientId: otherUserId,
        status: 'PENDING',
      },
    })

    const accessToken = jwt.sign({ sub: userId })

    const response = await request(app.getHttpServer())
      .get('/connections/request')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      connections: [
        expect.objectContaining({
          id: expect.any(String),
          senderId: userId,
          recipientId: otherUserId,
          status: 'PENDING',
        }),
      ],
    })
  })
})

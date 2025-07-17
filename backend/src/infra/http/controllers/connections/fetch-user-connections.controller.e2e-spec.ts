import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { JwtService } from '@nestjs/jwt'

describe('Fetch User Accepted Connections (E2E)', () => {
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

  test('[GET] /connections/:userId/connections', async () => {
    const userA = randomUUID()
    const userB = randomUUID()

    await prisma.user.createMany({
      data: [
        {
          id: userA,
          name: 'User A',
          email: 'a@example.com',
          passwordHash: await hash('123456', 8),
        },
        {
          id: userB,
          name: 'User B',
          email: 'b@example.com',
          passwordHash: await hash('abcdef', 8),
        },
      ],
    })

    const connection = await prisma.connection.create({
      data: {
        senderId: userA,
        recipientId: userB,
        status: 'ACCEPTED',
      },
    })

    const accessToken = jwt.sign({ sub: userB })

    const response = await request(app.getHttpServer())
      .get(`/connections/${userA}/connections`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.connections).toBeDefined()
    expect(Array.isArray(response.body.connections)).toBe(true)
    expect(response.body.connections[0]).toEqual(
      expect.objectContaining({
        id: connection.id,
        senderId: userA,
        recipientId: userB,
        status: 'ACCEPTED',
      }),
    )
  })
})

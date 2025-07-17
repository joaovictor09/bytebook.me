import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Remove Connection (E2E)', () => {
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

  test('[PATCH] /connections/:connectionId', async () => {
    const userAId = randomUUID()
    const userBId = randomUUID()

    await prisma.user.create({
      data: {
        id: userAId,
        name: 'User A',
        email: 'usera@example.com',
        passwordHash: await hash('passwordA', 8),
      },
    })

    await prisma.user.create({
      data: {
        id: userBId,
        name: 'User B',
        email: 'userb@example.com',
        passwordHash: await hash('passwordB', 8),
      },
    })

    const connection = await prisma.connection.create({
      data: {
        senderId: userAId,
        recipientId: userBId,
        status: 'ACCEPTED',
      },
    })

    const accessToken = jwt.sign({ sub: userAId })

    const response = await request(app.getHttpServer())
      .delete(`/connections/${connection.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)

    const deletedConnection = await prisma.connection.findUnique({
      where: { id: connection.id },
    })

    expect(deletedConnection).toBeNull()
  })
})

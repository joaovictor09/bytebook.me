import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Delete Scrap Comment (E2E)', () => {
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

  test('[DELETE] /scraps/comments/:commentId', async () => {
    const senderId = randomUUID()
    const recipientId = randomUUID()

    await prisma.user.createMany({
      data: [
        {
          id: senderId,
          name: 'Comentador',
          email: 'commenter@example.com',
          passwordHash: await hash('123456', 8),
        },
        {
          id: recipientId,
          name: 'Dono do perfil',
          email: 'owner@example.com',
          passwordHash: await hash('abcdef', 8),
        },
      ],
    })

    const scrap = await prisma.scrap.create({
      data: {
        senderId,
        recipientId,
        message: 'Olá!',
      },
    })

    const comment = await prisma.scrapComment.create({
      data: {
        scrapId: scrap.id,
        senderId,
        message: 'Comentário teste',
      },
    })

    const accessToken = jwt.sign({ sub: senderId })

    const response = await request(app.getHttpServer())
      .delete(`/scraps/comments/${comment.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)

    const commentInDb = await prisma.scrapComment.findUnique({
      where: { id: comment.id },
    })

    expect(commentInDb).toBeNull()
  })
})

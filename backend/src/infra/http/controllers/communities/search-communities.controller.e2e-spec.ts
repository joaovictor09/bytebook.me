import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { randomUUID } from 'crypto'
import { hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

describe('Search Communities (E2E)', () => {
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
        name: 'User Teste',
        email: 'user.teste@example.com',
        passwordHash: await hash('123456', 8),
      },
    })
  })

  beforeEach(async () => {
    await prisma.community.deleteMany({})
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return filtered communities when query is provided, or all if not', async () => {
    await prisma.community.createMany({
      data: [
        {
          name: 'Eu odeio JavaScript puro',
          description: 'A comunidade mais engraçada',
          ownerId: userId,
          memberCount: 1,
        },
        {
          name: 'React Lovers',
          description: 'Amamos React',
          ownerId: userId,
          memberCount: 1,
        },
      ],
    })

    const accessToken = jwt.sign({ sub: userId })

    const responseWithQuery = await request(app.getHttpServer())
      .get('/communities/search')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({ q: 'javascript' })
      .expect(200)

    expect(responseWithQuery.body.communities).toHaveLength(1)
    expect(responseWithQuery.body.communities[0].name).toBe(
      'Eu odeio JavaScript puro',
    )

    const responseWithoutQuery = await request(app.getHttpServer())
      .get('/communities/search')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(responseWithoutQuery.body.communities).toHaveLength(2)
  })
})

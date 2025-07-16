import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Create Community (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /communities - should create a new community', async () => {
    const userId = randomUUID()

    // Cria usuário no banco
    await prisma.user.create({
      data: {
        id: userId,
        name: 'Test User',
        email: 'testuser@example.com',
        passwordHash: await hash('password123', 8),
      },
    })

    // Gera token JWT para autenticação
    const accessToken = jwt.sign({ sub: userId })

    const payload = {
      name: 'Eu Odeio JavaScript Puro',
      description: 'Comunidade para reclamar do JS sem frameworks',
    }

    const response = await request(app.getHttpServer())
      .post('/communities')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)

    expect(response.status).toBe(201)
    expect(response.body.community).toMatchObject({
      name: payload.name,
      description: payload.description,
      ownerId: userId,
      memberCount: 1,
    })

    // Verifica que a comunidade foi criada no banco
    const createdCommunity = await prisma.community.findUnique({
      where: { id: response.body.community.id },
    })

    expect(createdCommunity).not.toBeNull()
  })
})

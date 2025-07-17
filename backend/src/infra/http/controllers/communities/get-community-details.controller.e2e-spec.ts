import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Get Community Details (E2E)', () => {
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

  it('should return community details for an existing community', async () => {
    const userId = randomUUID()
    const communityId = randomUUID()

    // Cria usuário
    await prisma.user.create({
      data: {
        id: userId,
        name: 'User',
        email: 'user@example.com',
        passwordHash: await hash('password123', 8),
      },
    })

    // Cria comunidade
    await prisma.community.create({
      data: {
        id: communityId,
        name: 'Test Community',
        description: 'Descrição da comunidade',
        ownerId: userId,
        memberCount: 1,
      },
    })

    // Gera token JWT para autenticação
    const accessToken = jwt.sign({ sub: userId })

    const response = await request(app.getHttpServer())
      .get(`/communities/${communityId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(response.body.community).toBeDefined()
    expect(response.body.community.id).toBe(communityId)
    expect(response.body.community.name).toBe('Test Community')
    expect(response.body.community.description).toBe('Descrição da comunidade')
    expect(response.body.community.ownerId).toBe(userId)
  })

  it('should return 404 if community does not exist', async () => {
    const userId = randomUUID()
    const communityId = randomUUID()

    await prisma.user.create({
      data: {
        id: userId,
        name: 'User',
        email: 'user2@example.com',
        passwordHash: await hash('password123', 8),
      },
    })

    const accessToken = jwt.sign({ sub: userId })

    const response = await request(app.getHttpServer())
      .get(`/communities/${communityId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(404)
  })
})

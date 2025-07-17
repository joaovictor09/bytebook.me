import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Get Topic Details (E2E)', () => {
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

  it('should return topic details for an existing topic', async () => {
    const userId = randomUUID()
    const communityId = randomUUID()
    const topicId = randomUUID()

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

    // Cria tópico
    await prisma.topic.create({
      data: {
        id: topicId,
        title: 'Tópico Detalhado',
        content: 'Conteúdo detalhado',
        communityId,
        authorId: userId,
      },
    })

    // Gera token JWT para autenticação
    const accessToken = jwt.sign({ sub: userId })

    const response = await request(app.getHttpServer())
      .get(`/topics/${topicId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(response.body.topic).toBeDefined()
    expect(response.body.topic.id).toBe(topicId)
    expect(response.body.topic.title).toBe('Tópico Detalhado')
    expect(response.body.topic.content).toBe('Conteúdo detalhado')
    expect(response.body.topic.communityId).toBe(communityId)
    expect(response.body.topic.authorId).toBe(userId)
  })

  it('should return 404 if topic does not exist', async () => {
    const userId = randomUUID()
    const topicId = randomUUID()

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
      .get(`/topics/${topicId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(404)
  })
})

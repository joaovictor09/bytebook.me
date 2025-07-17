import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Fetch Community Topics (E2E)', () => {
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

  it('should return all topics of a community', async () => {
    const userId = randomUUID()
    const communityId = randomUUID()
    const topic1Id = randomUUID()
    const topic2Id = randomUUID()

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

    // Cria tópicos
    await prisma.topic.createMany({
      data: [
        {
          id: topic1Id,
          title: 'Primeiro tópico',
          content: 'Conteúdo do primeiro tópico',
          communityId,
          authorId: userId,
        },
        {
          id: topic2Id,
          title: 'Segundo tópico',
          content: 'Conteúdo do segundo tópico',
          communityId,
          authorId: userId,
        },
      ],
    })

    // Gera token JWT para autenticação
    const accessToken = jwt.sign({ sub: userId })

    const response = await request(app.getHttpServer())
      .get(`/communities/${communityId}/topics`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(Array.isArray(response.body.topics)).toBe(true)
    expect(response.body.topics.length).toBe(2)
    const topicIds = response.body.topics.map((t: any) => t.id)
    expect(topicIds).toContain(topic1Id)
    expect(topicIds).toContain(topic2Id)
  })

  it('should return an empty list if the community has no topics', async () => {
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

    await prisma.community.create({
      data: {
        id: communityId,
        name: 'Empty Community',
        description: 'Sem tópicos',
        ownerId: userId,
        memberCount: 1,
      },
    })

    const accessToken = jwt.sign({ sub: userId })

    const response = await request(app.getHttpServer())
      .get(`/communities/${communityId}/topics`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(Array.isArray(response.body.topics)).toBe(true)
    expect(response.body.topics.length).toBe(0)
  })
})

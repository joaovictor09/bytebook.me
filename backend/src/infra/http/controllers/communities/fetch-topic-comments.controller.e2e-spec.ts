import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { AppModule } from '@/infra/app.module'

describe('Fetch Topic Comments (E2E)', () => {
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

  it('should return all comments of a topic', async () => {
    const userId = randomUUID()
    const communityId = randomUUID()
    const topicId = randomUUID()
    const comment1Id = randomUUID()
    const comment2Id = randomUUID()

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
        title: 'Tópico de Teste',
        content: 'Conteúdo do tópico',
        communityId,
        authorId: userId,
      },
    })

    // Cria comentários
    await prisma.topicComment.createMany({
      data: [
        {
          id: comment1Id,
          message: 'Primeiro comentário',
          topicId,
          authorId: userId,
        },
        {
          id: comment2Id,
          message: 'Segundo comentário',
          topicId,
          authorId: userId,
        },
      ],
    })

    // Gera token JWT para autenticação
    const accessToken = jwt.sign({ sub: userId })

    const response = await request(app.getHttpServer())
      .get(`/topics/${topicId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(Array.isArray(response.body.topicComments)).toBe(true)
    expect(response.body.topicComments.length).toBe(2)
    const commentIds = response.body.topicComments.map((c: any) => c.id)
    expect(commentIds).toContain(comment1Id)
    expect(commentIds).toContain(comment2Id)
  })

  it('should return an empty list if the topic has no comments', async () => {
    const userId = randomUUID()
    const communityId = randomUUID()
    const topicId = randomUUID()

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
        description: 'Sem comentários',
        ownerId: userId,
        memberCount: 1,
      },
    })

    await prisma.topic.create({
      data: {
        id: topicId,
        title: 'Tópico sem comentários',
        content: 'Conteúdo',
        communityId,
        authorId: userId,
      },
    })

    const accessToken = jwt.sign({ sub: userId })

    const response = await request(app.getHttpServer())
      .get(`/topics/${topicId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(Array.isArray(response.body.topicComments)).toBe(true)
    expect(response.body.topicComments.length).toBe(0)
  })
})

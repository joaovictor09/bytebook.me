import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Comment on Topic (E2E)', () => {
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

  it('should create a comment on a topic', async () => {
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

    // Adiciona usuário como membro da comunidade
    await prisma.communityMember.create({
      data: {
        userId,
        communityId,
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

    // Gera token JWT para autenticação
    const accessToken = jwt.sign({ sub: userId })

    const payload = {
      message: 'Comentário de teste',
    }

    const response = await request(app.getHttpServer())
      .post(`/topics/${topicId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(201)

    expect(response.body.topicComment).toBeDefined()
    expect(response.body.topicComment.message).toBe(payload.message)
    expect(response.body.topicComment.topicId).toBe(topicId)
    expect(response.body.topicComment.authorId).toBe(userId)

    // Verifica que o comentário foi criado no banco
    const createdComment = await prisma.topicComment.findUnique({
      where: { id: response.body.topicComment.id },
    })
    expect(createdComment).not.toBeNull()
  })
})

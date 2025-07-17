import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Create Topic (E2E)', () => {
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

  it('should create a new topic in an existing community', async () => {
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

    await prisma.communityMember.create({
      data: {
        userId,
        communityId,
      },
    })

    // Gera token JWT para autenticação
    const accessToken = jwt.sign({ sub: userId })

    const payload = {
      title: 'Novo Tópico',
      content: 'Conteúdo do tópico',
    }

    const response = await request(app.getHttpServer())
      .post(`/communities/${communityId}/topics`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)
      .expect(201)

    expect(response.body.topic).toBeDefined()
    expect(response.body.topic.title).toBe(payload.title)
    expect(response.body.topic.content).toBe(payload.content)
    expect(response.body.topic.communityId).toBe(communityId)
    expect(response.body.topic.authorId).toBe(userId)

    // Verifica que o tópico foi criado no banco
    const createdTopic = await prisma.topic.findUnique({
      where: { id: response.body.topic.id },
    })
    expect(createdTopic).not.toBeNull()
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

    const payload = {
      title: 'Tópico Inexistente',
      content: 'Conteúdo',
    }

    const response = await request(app.getHttpServer())
      .post(`/communities/${communityId}/topics`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload)

    expect(response.status).toBe(404)
  })

  it('should return 400 if required fields are missing', async () => {
    const userId = randomUUID()
    const communityId = randomUUID()

    await prisma.user.create({
      data: {
        id: userId,
        name: 'User',
        email: 'user3@example.com',
        passwordHash: await hash('password123', 8),
      },
    })

    await prisma.community.create({
      data: {
        id: communityId,
        name: 'Test Community 2',
        description: 'Descrição',
        ownerId: userId,
        memberCount: 1,
      },
    })

    const accessToken = jwt.sign({ sub: userId })

    // Envia sem o campo 'title'
    const response = await request(app.getHttpServer())
      .post(`/communities/${communityId}/topics`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ content: 'Só conteúdo' })

    expect(response.status).toBe(400)
  })
})

import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Join Community (E2E)', () => {
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

  it('[POST] /communities/:communityId/join - should add user as a community member', async () => {
    const userId = randomUUID()
    const communityId = randomUUID()

    // Cria usuário no banco
    await prisma.user.create({
      data: {
        id: userId,
        name: 'Test User',
        email: 'testuser@example.com',
        passwordHash: await hash('password123', 8),
      },
    })

    // Cria comunidade no banco
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
      .post(`/communities/${communityId}/join`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(201)

    expect(response.body.communityMember).toMatchObject({
      communityId,
      userId,
    })

    // Verifica que o usuário foi adicionado como membro da comunidade
    const member = await prisma.communityMember.findUnique({
      where: {
        communityId_userId: {
          userId,
          communityId,
        },
      },
    })

    expect(member).not.toBeNull()
  })
})

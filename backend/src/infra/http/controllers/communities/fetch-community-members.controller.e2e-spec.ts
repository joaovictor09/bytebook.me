import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Fetch Community Members (E2E)', () => {
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

  it('should return all members of a community', async () => {
    const userId1 = randomUUID()
    const userId2 = randomUUID()
    const communityId = randomUUID()

    // Cria usuários
    await prisma.user.createMany({
      data: [
        {
          id: userId1,
          name: 'User 1',
          email: 'user1@example.com',
          passwordHash: await hash('password123', 8),
        },
        {
          id: userId2,
          name: 'User 2',
          email: 'user2@example.com',
          passwordHash: await hash('password123', 8),
        },
      ],
    })

    // Cria comunidade
    await prisma.community.create({
      data: {
        id: communityId,
        name: 'Test Community',
        description: 'Descrição da comunidade',
        ownerId: userId1,
        memberCount: 2,
      },
    })

    // Adiciona membros
    await prisma.communityMember.createMany({
      data: [
        { userId: userId1, communityId },
        { userId: userId2, communityId },
      ],
    })

    // Gera token JWT para autenticação
    const accessToken = jwt.sign({ sub: userId1 })

    const response = await request(app.getHttpServer())
      .get(`/communities/${communityId}/members`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(Array.isArray(response.body.communityMembers)).toBe(true)
    expect(response.body.communityMembers.length).toBe(2)
    const userIds = response.body.communityMembers.map((m: any) => m.userId)
    expect(userIds).toContain(userId1)
    expect(userIds).toContain(userId2)
  })

  it('should return an empty list if the community has no members', async () => {
    const communityId = randomUUID()
    const userId = randomUUID()

    await prisma.user.create({
      data: {
        id: userId,
        name: 'User',
        email: 'user@example.com',
        passwordHash: await hash('password123', 8),
      },
    })

    await prisma.community.create({
      data: {
        id: communityId,
        name: 'Empty Community',
        description: 'Sem membros',
        ownerId: userId,
        memberCount: 0,
      },
    })

    const accessToken = jwt.sign({ sub: userId })

    const response = await request(app.getHttpServer())
      .get(`/communities/${communityId}/members`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(Array.isArray(response.body.communityMembers)).toBe(true)
    expect(response.body.communityMembers.length).toBe(0)
  })
})

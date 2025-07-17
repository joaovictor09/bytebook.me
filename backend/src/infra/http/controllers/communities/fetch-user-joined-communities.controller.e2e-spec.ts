import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Fetch User Joined Communities (E2E)', () => {
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

  it('should return all communities the user is a member of', async () => {
    const userId = randomUUID()
    const otherUserId = randomUUID()
    const community1Id = randomUUID()
    const community2Id = randomUUID()

    // Cria usuários
    await prisma.user.createMany({
      data: [
        {
          id: userId,
          name: 'Test User',
          email: 'testuser@example.com',
          passwordHash: await hash('password123', 8),
        },
        {
          id: otherUserId,
          name: 'Other User',
          email: 'otheruser@example.com',
          passwordHash: await hash('password123', 8),
        },
      ],
    })

    // Cria comunidades
    await prisma.community.createMany({
      data: [
        {
          id: community1Id,
          name: 'Community 1',
          description: 'Primeira comunidade',
          ownerId: userId,
          memberCount: 2,
        },
        {
          id: community2Id,
          name: 'Community 2',
          description: 'Segunda comunidade',
          ownerId: otherUserId,
          memberCount: 1,
        },
      ],
    })

    // Adiciona membros
    await prisma.communityMember.createMany({
      data: [
        { userId, communityId: community1Id },
        { userId: otherUserId, communityId: community1Id },
        { userId, communityId: community2Id },
      ],
    })

    // Gera token JWT para autenticação
    const accessToken = jwt.sign({ sub: userId })

    const response = await request(app.getHttpServer())
      .get(`/users/${userId}/communities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(Array.isArray(response.body.communityMembers)).toBe(true)
    expect(response.body.communityMembers.length).toBe(2)
    const communityIds = response.body.communityMembers.map(
      (m: any) => m.communityId,
    )
    expect(communityIds).toContain(community1Id)
    expect(communityIds).toContain(community2Id)
  })

  it('should return an empty list if user is not a member of any community', async () => {
    const userId = randomUUID()

    await prisma.user.create({
      data: {
        id: userId,
        name: 'Lonely User',
        email: 'lonely@example.com',
        passwordHash: await hash('password123', 8),
      },
    })

    const accessToken = jwt.sign({ sub: userId })

    const response = await request(app.getHttpServer())
      .get(`/users/${userId}/communities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(Array.isArray(response.body.communityMembers)).toBe(true)
    expect(response.body.communityMembers.length).toBe(0)
  })
})

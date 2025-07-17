import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

describe('Leave Community (E2E)', () => {
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

  it('should remove a regular member from the community', async () => {
    const ownerId = randomUUID()
    const memberId = randomUUID()
    const communityId = randomUUID()

    // Cria owner e membro
    await prisma.user.createMany({
      data: [
        {
          id: ownerId,
          name: 'Owner User',
          email: 'owner@example.com',
          passwordHash: await hash('password123', 8),
        },
        {
          id: memberId,
          name: 'Member User',
          email: 'member@example.com',
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
        ownerId,
        memberCount: 2,
      },
    })

    // Adiciona owner e membro como membros da comunidade
    await prisma.communityMember.createMany({
      data: [
        { userId: ownerId, communityId },
        { userId: memberId, communityId },
      ],
    })

    // Membro comum tenta sair
    const memberToken = jwt.sign({ sub: memberId })
    await request(app.getHttpServer())
      .delete(`/communities/${communityId}/leave`)
      .set('Authorization', `Bearer ${memberToken}`)
      .expect(200)

    // Verifica que o membro foi removido
    const member = await prisma.communityMember.findUnique({
      where: {
        communityId_userId: {
          userId: memberId,
          communityId,
        },
      },
    })
    expect(member).toBeNull()
  })

  it('should NOT allow the owner to leave their own community', async () => {
    const ownerId = randomUUID()
    const communityId = randomUUID()

    // Cria owner
    await prisma.user.create({
      data: {
        id: ownerId,
        name: 'Owner User',
        email: 'owner2@example.com',
        passwordHash: await hash('password123', 8),
      },
    })

    // Cria comunidade
    await prisma.community.create({
      data: {
        id: communityId,
        name: 'Test Community 2',
        description: 'Descrição da comunidade',
        ownerId,
        memberCount: 1,
      },
    })

    // Adiciona owner como membro
    await prisma.communityMember.create({
      data: { userId: ownerId, communityId },
    })

    // Owner tenta sair
    const ownerToken = jwt.sign({ sub: ownerId })
    const response = await request(app.getHttpServer())
      .delete(`/communities/${communityId}/leave`)
      .set('Authorization', `Bearer ${ownerToken}`)

    // Espera erro (ajuste o status conforme sua regra de negócio, 400 ou 403 são comuns)
    expect(response.status).toBeGreaterThanOrEqual(400)
    expect(response.status).toBeLessThan(500)
    // Opcional: checar mensagem de erro
    // expect(response.body.message).toMatch(/owner.*cannot.*leave/i)

    // Owner continua como membro
    const ownerMember = await prisma.communityMember.findUnique({
      where: {
        communityId_userId: {
          userId: ownerId,
          communityId,
        },
      },
    })
    expect(ownerMember).not.toBeNull()
  })
})

import { Decrypter } from '@/domain/auth/cryptography/decrypter'
import { Encrypter } from '@/domain/auth/cryptography/encrypter'
import dayjs from 'dayjs'

export class FakeEncrypter implements Encrypter, Decrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    // Se já tiver exp no payload, usa ele. Senão, define um para daqui 1h.
    const completePayload = {
      ...payload,
      exp: (payload as any).exp ?? dayjs().add(7, 'days').unix(),
    }

    return JSON.stringify(completePayload)
  }

  async decrypt(token: string): Promise<Record<string, unknown>> {
    return JSON.parse(token)
  }
}

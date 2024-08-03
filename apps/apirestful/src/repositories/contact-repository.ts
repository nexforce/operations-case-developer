import { Contact } from '@prisma/client'

export type CreateContactData = {
  name: string
  email: string
  hubSpotId: string
}


export interface ContactRepository {
  create: (data: CreateContactData) => Promise<Contact>
}

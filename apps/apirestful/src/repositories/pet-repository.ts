import { Pet } from '@prisma/client'

export type CreateData = {
  name: string
  age: number
  breedId: string
  contactId: string
  hubSpotId: string
}


export interface PetRepository {
  create: (data: CreateData) => Promise<Pet>
}

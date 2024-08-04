import { Pet } from '@prisma/client'

export type CreateData = {
  name: string
  age: number
  breedId: string
  contactId: string
  hubSpotId: string
}

export type GetPaginatedData = {
  skip: number,
  take: number,
  orderBy?: {
    createdAt?: 'asc' | 'desc'
  },
  where?: {
    breed?: string
  }
}


export interface PetRepository {
  create: (data: CreateData) => Promise<Pet>
  getPaginated: (data: GetPaginatedData) => Promise<Pet[]>
  count: () => Promise<number>
}

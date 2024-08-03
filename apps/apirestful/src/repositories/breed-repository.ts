import { Breed } from '@prisma/client'

export type CreateBreedData = {
  name: string
}


export interface BreedRepository {
  create: (data: CreateBreedData) => Promise<Breed>
}

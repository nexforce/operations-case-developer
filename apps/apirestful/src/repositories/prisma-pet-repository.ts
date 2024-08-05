import { Pet } from "@prisma/client";
import { CreateData, GetPaginatedData, PetRepository } from "./pet-repository";
import { db } from '../services/db/client'

export class PrismaPetRepository implements PetRepository {
  async getBreeds(): Promise<string[]> {
    const breeds = await db.pet.findMany({
      distinct: ['breed'],
      select: {
        breed: true
      }
    })

    const uniqueBreeds = breeds.map(breed => breed.breed)

    return uniqueBreeds
  }

  async getById(id: string): Promise<Pet | null> {
    const pet = await db.pet.findUnique({
      where: {
        id
      }
    })

    return pet
  }

  async count(breed?: string): Promise<number> {
    const where = {}

    if (breed !== 'undefined') {
      where.breed = breed
    }

    return await db.pet.count({
      where: where
    })
  }

  async getPaginated(data: GetPaginatedData): Promise<Pet[]> {
    const where = {}

    if (data.where?.breed !== 'undefined') {
      where.breed = data.where?.breed
    }

    const pets = await db.pet.findMany({
      skip: data.skip,
      take: data.take,
      orderBy: {
        createdAt: data.orderBy?.createdAt
      },
      where: where
    })

    return pets
  }

  async create(data: CreateData): Promise<Pet> {
    const pet = await db.pet.create({ data })

    return pet
  }
}

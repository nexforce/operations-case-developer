import { Pet } from "@prisma/client";
import { CreateData, GetPaginatedData, PetRepository } from "./pet-repository";
import { db } from '../services/db/client'

export class PrismaPetRepository implements PetRepository {
  async count(): Promise<number> {
    return await db.pet.count()
  }
  async getPaginated(data: GetPaginatedData): Promise<Pet[]> {
    const pets = await db.pet.findMany({
      skip: data.skip,
      take: data.take,
      orderBy: {
        createdAt: data.orderBy?.createdAt
      }
    })

    return pets
  }

  async create(data: CreateData): Promise<Pet> {
    const pet = await db.pet.create({ data })

    return pet
  }
}

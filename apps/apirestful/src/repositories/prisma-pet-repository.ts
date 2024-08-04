import { Pet } from "@prisma/client";
import { CreateData, PetRepository } from "./pet-repository";
import { db } from '../services/db/client'

export class PrismaPetRepository implements PetRepository {
  async create(data: CreateData): Promise<Pet>  {
    const pet = await db.pet.create({ data })

    return pet
  }
}

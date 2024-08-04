import { Breed } from "@prisma/client";
import { BreedRepository, CreateBreedData } from "./breed-repository";
import { db } from '../services/db/client'

export class PrismaBreedRepository implements BreedRepository {
  async create(data: CreateBreedData): Promise<Breed> {
    const breed = await db.breed.create({ data })
    return breed
  }
}

import { Pet } from "@prisma/client";
import { CreateData, PetRepository } from "./pet-repository";

export class InMemoryPetRepository implements PetRepository {
  private pets: Pet[] = [];

  async create(data: CreateData): Promise<Pet> {
    const pet = {
      id: Math.random().toString(36).substring(2, 9),
      name: data.name,
      age: data.age,
      breed: data.breed,
      contactId: data.contactId,
      hubSpotId: data.hubSpotId,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }

    this.pets.push(pet)

    return pet
  }
}

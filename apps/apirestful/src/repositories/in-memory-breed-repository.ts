import { Breed } from "@prisma/client";
import { BreedRepository, CreateBreedData } from "./breed-repository";

export class InMemoryBreedRepository implements BreedRepository {
    private breeds: Breed[] = [];

    async create(data: CreateBreedData): Promise<Breed> {
        const breed = {
            id: Math.random().toString(36).substring(2, 9),
            name: data.name,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }

        this.breeds.push(breed)

        return breed
    }
}

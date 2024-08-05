import { Request, Response } from 'express'
import { PetRepository } from '../repositories/pet-repository'

class ListBreedsController {
  private petRepository: PetRepository

  constructor(
    petRepositoryInput: PetRepository,
  ) {
    this.petRepository = petRepositoryInput

    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response) {
    const breeds = await this.petRepository.getBreeds()

    return response.status(200).send(breeds)
  }
}

export default ListBreedsController

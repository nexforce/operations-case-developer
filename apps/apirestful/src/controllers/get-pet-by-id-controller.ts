import { Request, Response } from 'express'
import { PetRepository } from '../repositories/pet-repository'

class GetPetByIdController {
  private petRepository: PetRepository

  constructor(
    petRepositoryInput: PetRepository,
  ) {
    this.petRepository = petRepositoryInput

    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response) {
    const id = request.params.id

    const pet = await this.petRepository.getById(id)

    if (!pet) {
      return response.status(404).send({
        message: `Pet with given id ${id} not found`
      })
    }

    return response.status(200).json(pet)
  }
}

export default GetPetByIdController

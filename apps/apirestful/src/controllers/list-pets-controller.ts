import { Request, Response } from 'express'
import { PetRepository } from '../repositories/pet-repository'

class ListPetsController {
  private petRepository: PetRepository

  constructor(
    petRepositoryInput: PetRepository,
  ) {
    this.petRepository = petRepositoryInput

    this.handle = this.handle.bind(this);
  }

  async handle(request: Request, response: Response) {
    const page = parseInt(request.query.page as string) || 1
    const pageSize = parseInt(request.query.pageSize as string) || 10
    const skip = (page - 1) * pageSize

    const breed = String(request.query.breed)

    if (!breed.trim()) {
      return response.status(400).send()
    }

    const pets = await this.petRepository.getPaginated({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: 'asc'
      }
    })

    const totalItems = await this.petRepository.count()
    const totalPages = Math.ceil(totalItems / pageSize)

    return response.status(200).json({ items: pets, totalItems, totalPages, currentPage: page, pageSize })
  }
}

export default ListPetsController

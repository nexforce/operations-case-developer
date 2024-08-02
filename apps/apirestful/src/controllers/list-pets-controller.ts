import { Request, Response } from 'express'
import { db } from '../services/db/client'

class ListPetsController {
  async handle(request: Request, response: Response) {
    const page = parseInt(request.query.page as string) || 1
    const pageSize = parseInt(request.query.pageSize as string) || 10
    const skip = (page - 1) * pageSize

    const pets = await db.pet.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: 'asc'
      }
    })

    const totalItems = await db.pet.count()
    const totalPages = Math.ceil(totalItems / pageSize)

    return response.status(200).json({ items: pets, totalItems, totalPages, currentPage: page, pageSize })
  }
}

export default ListPetsController

import ListPetsController from "../controllers/list-pets-controller"
import { PrismaPetRepository } from "../repositories/prisma-pet-repository"

export const makeListPetsController = () => {
  const petRepository = new PrismaPetRepository()
  const listPetsController = new ListPetsController(petRepository)

  return listPetsController
}
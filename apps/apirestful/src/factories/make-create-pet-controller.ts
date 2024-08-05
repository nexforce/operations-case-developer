import CreatePetController from "../controllers/create-pet-controller";
import CreatePetInHubSpotUseCase from "../usecases/create-pet-in-hub-spot";
import GetContactByIdFromHubSpotUseCase from "../usecases/get-contact-by-id-from-hub-spot";
import { PrismaPetRepository } from '../repositories/prisma-pet-repository'
import { PrismaContactRepository } from '../repositories/prisma-contact-repository'

export const makeCreatePetController = () => {
  const createPetInHubSpot = new CreatePetInHubSpotUseCase()
  const getContactIdFromHubSpot = new GetContactByIdFromHubSpotUseCase()
  const petRepository = new PrismaPetRepository()
  const contactRepository = new PrismaContactRepository()
  const createPetController = new CreatePetController(
    createPetInHubSpot,
    getContactIdFromHubSpot,
    petRepository,
    contactRepository
  )

  return createPetController;
};

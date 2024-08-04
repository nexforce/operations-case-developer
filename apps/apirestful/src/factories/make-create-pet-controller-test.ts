import CreatePetController from "../controllers/create-pet-controller";
import { CreatePetInCRMPlatform, GetContactByIdFromCRMPlatform } from "../protocols";
import { PrismaBreedRepository } from "../repositories/prisma-breed-repository";
import { PrismaContactRepository } from "../repositories/prisma-contact-repository";
import { PrismaPetRepository } from "../repositories/prisma-pet-repository";

type PetInput = { name: string; age: string; breed: string; contactId: string }
type CreatePetResult = { id: string }

class CreatePetInHubSpotUseCaseMock implements CreatePetInCRMPlatform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(_properties: PetInput): Promise<CreatePetResult> {
    return {
      id: '1'
    }
  }
}

type Contact = {
  id: string
  name: string
  email: string
  firstname: string
  lastname: string
}

class GetContactByIdFromHubSpotUseCaseMock implements GetContactByIdFromCRMPlatform {
  async getById(contactId: string): Promise<Contact> {
    return {
      id: contactId,
      name: 'name',
      email: 'email',
      firstname: 'firstname',
      lastname: 'lastname'
    }
  }
}

export const makeCreatePetControllerTest = () => {
  const createPetInHubSpot = new CreatePetInHubSpotUseCaseMock()
  const getContactIdFromHubSpot = new GetContactByIdFromHubSpotUseCaseMock()
  const petRepository = new PrismaPetRepository()
  const contactRepository = new PrismaContactRepository()
  const breedRepository = new PrismaBreedRepository()
  const createPetController = new CreatePetController(
    createPetInHubSpot,
    getContactIdFromHubSpot,
    petRepository,
    breedRepository,
    contactRepository
  )

  return createPetController
}
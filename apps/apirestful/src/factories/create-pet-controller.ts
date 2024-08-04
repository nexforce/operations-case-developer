import CreatePetController from "../controllers/create-pet-controller";
import { createClient } from "../services/db/client";
import CreatePetInHubSpotUseCase from "../usecases/create-pet-in-hub-spot";
import GetContactByIdFromHubSpotUseCase from "../usecases/get-contact-by-id-from-hub-spot";

export const makeCreatePetController = () => {
  const createPetInHubSpot = new CreatePetInHubSpotUseCase()
  const getContactIdFromHubSpot  = new GetContactByIdFromHubSpotUseCase()
  const dbClient = createClient()
  const createPetController = new CreatePetController(
    createPetInHubSpot,
    getContactIdFromHubSpot,
    dbClient
  )

  return createPetController;
};

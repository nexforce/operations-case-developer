import { Router } from 'express'
import CreatePetController from '../controllers/create-pet-controller'
import ListPetsController from '../controllers/list-pets-controller'
import UpdatePetController from '../controllers/update-pet-controller'
import DeletePetController from '../controllers/delete-pet-controller'
import GetContactByIdFromHubSpotUseCase from '../usecases/get-contact-by-id-from-hub-spot'
import CreatePetInHubSpotUseCase from '../usecases/create-pet-in-hub-spot'

const router = Router()

router.get('/', (_, response) => {
  response.status(200).json({ message: 'Hello World' })
})

const createPetInHubSpot = new CreatePetInHubSpotUseCase()
const getContactIdFromHubSpot  = new GetContactByIdFromHubSpotUseCase()
const createPetController = new CreatePetController(
  createPetInHubSpot,
  getContactIdFromHubSpot
)

router.post('/pet', createPetController.handle)

const listPetsController = new ListPetsController()

router.get('/pet', listPetsController.handle)

const updatePetController = new UpdatePetController()

router.put('/pet/:id', updatePetController.handle)

const deletePetController = new DeletePetController()

router.delete('/pet/:id', deletePetController.handle)

export default router

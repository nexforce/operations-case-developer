import { Router } from 'express'
import CreatePetController from '../controllers/create-pet-controller'
import ListPetsController from '../controllers/list-pets-controller'

const router = Router()

router.get('/', (_, response) => {
  response.status(200).json({ message: 'Hello World' })
})

const createPetController = new CreatePetController()

router.post('/pet', createPetController.handle)

const listPetsController = new ListPetsController()

router.get('/pet', listPetsController.handle)

export default router

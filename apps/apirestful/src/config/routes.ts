import { Router } from 'express'
import CreatePetController from '../controllers/create-pet-controller'

const router = Router()

router.get('/', (_, response) => {
  response.status(200).json({ message: 'Hello World' })
})

const createPetController = new CreatePetController()

router.post('/pet', createPetController.handle)

export default router

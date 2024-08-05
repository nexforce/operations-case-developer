import { Request, Response } from 'express'
import { db } from '../services/db/client'
import hubspotClient from '../services/hubspot-client'

class DeletePetController {
  async handle(request: Request, response: Response) {
    const petId = request.params['id']

    const petFound = await db.pet.findUnique({
      where: {
        id: petId
      }
    })

    if (!petFound) return response.status(404).json({ message: 'Pet not found' })

    const petHubSpotId = petFound?.hubSpotId

    await hubspotClient.crm.objects.basicApi.archive('pets', petHubSpotId)

    await db.pet.delete({
      where: {
        id: petId
      }
    })

    return response.status(204).send()
  }
}

export default DeletePetController

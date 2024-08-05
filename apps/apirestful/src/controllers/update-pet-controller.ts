import { Request, Response } from 'express'
import { db } from '../services/db/client'
import hubspotClient from '../services/hubspot-client'

type UpdateProps = {
  name?: string
  age?: number
  breed?: string
}

class UpdatePetController {
  async handle(request: Request, response: Response) {
    const petId = request.params['id'] as string
    const name = request.body['name'] as string
    const age = request.body['age'] as number
    const breed = request.body['breed'] as string

    let update: UpdateProps = {}

    if (name) {
      update = { ...update, name }
    }

    if (age && age > 0) {
      update = { ...update, age }
    }

    if (breed) {
      update = { ...update, breed }
    }

    const petFound = await db.pet.findUnique({
      where: {
        id: petId
      }
    })

    if (!petFound) return response.status(404).json({ message: 'Pet not found' })

    const petHubSpotId = petFound.hubSpotId

    await hubspotClient.crm.objects.basicApi.update('pets', petHubSpotId, {
      properties: {
        name: update.name ? update.name : petFound.name,
        age: update?.age ? update.age?.toString() : petFound.age.toString(),
        breed: update.breed ? update.breed : petFound.breed
      }
    })

    await db.pet.update({
      where: {
        id: petId
      },
      data: {
        name: update.name,
        age: update.age,
        breed: update.breed
      }
    })

    return response.status(204).send()
  }
}

export default UpdatePetController

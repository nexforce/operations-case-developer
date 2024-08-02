import { Request, Response } from 'express'
import { db } from '../services/db/client'
import hubspotClient from '../services/hubspot-client'

type UpdateProps = {
  name?: string
  age?: number
  breedId?: string
}

class UpdatePetController {
  async handle(request: Request, response: Response) {
    const petId = request.params['id'] as string
    const name = request.body['name'] as string
    const age = request.body['age'] as number
    const breedId = request.body['breedId'] as string

    let update: UpdateProps = {}

    if (name) {
      update = { ...update, name }
    }

    if (age && age > 0) {
      update = { ...update, age }
    }

    if (breedId) {
      update = { ...update, breedId }
    }

    const petFound = await db.pet.findUnique({
      where: {
        id: petId
      },
      include: {
        breed: true
      }
    })

    if (!petFound) return response.status(404).json({ message: 'Pet not found' })

    const breedOfPetFound = petFound.breed

    const petHubSpotId = petFound.hubSpotId

    let breed = undefined

    if (update.breedId) {
      breed = await db.breed.findUnique({
        where: {
          id: update.breedId
        }
      })

      if (!breed) return response.status(404).json({ message: 'Breed not found' })
    }

    await hubspotClient.crm.objects.basicApi.update('pets', petHubSpotId, {
      properties: {
        name: update.name ? update.name : petFound.name,
        age: update?.age ? update.age?.toString() : petFound.age.toString(),
        breed: update.breedId && breed ? breed.name : breedOfPetFound.name
      }
    })

    const pet = await db.pet.update({
      where: {
        id: petId
      },
      data: {
        name: update.name,
        age: update.age,
        breedId: update.breedId
      }
    })

    return response.status(204).send()
  }
}

export default UpdatePetController

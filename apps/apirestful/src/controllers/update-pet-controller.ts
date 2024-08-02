import { Request, Response } from 'express'
import { db } from '../services/db/client'
import hubspotClient from '../services/hubspot-client'

class UpdatePetController {
  async handle(request: Request, response: Response) {
    const petId = request.body['petId'] as string
    const name = request.body['name'] as string
    const age = request.body['age'] as number
    const breedId = request.body['breedId'] as string

    const update = {
      name: '',
      age: 0,
      breedId: ''
    }

    if (name) {
      update.name = name
    }

    if (age && age > 0) {
      update.age = age
    }

    if (breedId) {
      update.breedId = breedId
    }

    const petFound = await db.pet.findUnique({
      where: {
        id: petId
      }
    })

    if (!petFound) return response.status(404).json({ message: 'Pet not found' })

    const petHubSpotId = petFound?.hubSpotId

    const breed = await db.breed.findUnique({
      where: {
        id: breedId
      }
    })

    if (!breed) return response.status(404).json({ message: 'Breed not found' })

    const results = await hubspotClient.crm.objects.basicApi.update('pets', petHubSpotId, {
      properties: {
        name: update.name,
        age: update.age.toString(),
        breed: breed.name
      }
    })

    console.log(results)

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

    return response.status(204).json(pet)
  }
}

export default UpdatePetController

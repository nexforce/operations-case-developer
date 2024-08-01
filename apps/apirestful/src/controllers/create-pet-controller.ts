import {Request, Response} from 'express'
import hubspotClient from '../services/hubspot-client'

class CreatePetController {
  async handle(request: Request, response: Response) {
    const { name, breed, age } = request.body

    const properties = {
      name, breed, age
    }

    const { results } = await hubspotClient.crm.objects.basicApi.create('pets', {
      properties: properties
    })

    response.status(201).json(results)
  }
}

export default CreatePetController

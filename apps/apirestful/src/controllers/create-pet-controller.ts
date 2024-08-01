import {Request, Response} from 'express'
import hubspotClient from '../services/hubspot-client'
import { db } from '../services/db/client'
import { AssociationSpecAssociationCategoryEnum } from '@hubspot/api-client/lib/codegen/crm/deals/models/AssociationSpec'

class CreatePetController {
  async handle(request: Request, response: Response) {
    const name = request.body['name'] as string
    const age = request.body['age'] as number
    const breed = request.body['breed'] as string

    const properties = { name, age, breed }

    const associationCategory = AssociationSpecAssociationCategoryEnum.UserDefined

    const { results } = await hubspotClient.crm.objects.basicApi.create('pets', {
      properties: {
        name,
        age: age.toString(),
        breed,
      },
      associations: [
        {
          to: {
            id: 'contact_id'
          },
          types: [
            {
              associationCategory: associationCategory,
              associationTypeId : 159
              // Create a type id for this association
              // Link: https://legacydocs.hubspot.com/docs/methods/crm-associations/crm-associations-overview
            }
          ]
        }
      ]
    })

    const pet = await db.pet.create({
      data: {
        name,
        age,
        breedId: 'breed',
        hubSpotId: 'id',
        contactId: 'contactId'
      }
    })

    return response.status(201).json(pet)
  }
}

export default CreatePetController

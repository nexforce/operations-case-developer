import { Request, Response } from 'express'
import hubspotClient from '../services/hubspot-client'
import { db } from '../services/db/client'
import { AssociationSpecAssociationCategoryEnum } from '@hubspot/api-client/lib/codegen/crm/deals/models/AssociationSpec'

class CreatePetController {
  async handle(request: Request, response: Response) {
    const name = request.body['name'] as string
    const age = request.body['age'] as number
    const breed = request.body['breed'] as string
    const contactId = request.body['contactId'] as string

    if (!name) {
      return response.status(400).send({
        message: 'Name is not provided. Ensure a non-empty text is provided.'
      })
    }

    const properties = { name, age: age.toString(), breed }

    const associationCategory = AssociationSpecAssociationCategoryEnum.UserDefined

    const contactFromHubspot = await hubspotClient.crm.objects.basicApi.getById('contacts', contactId)

    const results = await hubspotClient.crm.objects.basicApi.create('pets', {
      properties,
      associations: [
        {
          to: {
            id: contactId
          },
          types: [
            {
              associationCategory: associationCategory,
              associationTypeId: 19
              // Create a type id for this association
              // Link: https://legacydocs.hubspot.com/docs/methods/crm-associations/crm-associations-overview
            }
          ]
        }
      ]
    })

    const contactIdFromHubSpot = contactFromHubspot.id

    const contact = await db.contact.create({
      data: {
        name: contactFromHubspot.properties.firstname + ' ' + contactFromHubspot.properties.lastname.split(' ')[0],
        email: contactFromHubspot.properties.email,
        hubSpotId: contactIdFromHubSpot
      }
    })

    const breedRecord = await db.breed.create({
      data: {
        name: breed,
      }
    })

    const petIdFromHubSpot = results.id

    const pet = await db.pet.create({
      data: {
        name,
        age,
        breedId: breedRecord.id,
        hubSpotId: petIdFromHubSpot,
        contactId: contact.id
      }
    })

    return response.status(201).json(pet)
  }
}

export default CreatePetController

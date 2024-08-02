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

    const properties = { name, age: age.toString(), breed }

    const associationCategory = AssociationSpecAssociationCategoryEnum.UserDefined

    //const pets = await hubspotClient.crm.objects.basicApi.getPage('pets', undefined, undefined, ['name', 'breed', 'age'])

    const contacts = await hubspotClient.crm.objects.basicApi.getPage('contacts', undefined, undefined, ['name', 'email'])

    console.log(contacts)


    //const results1 = await hubspotClient.crm.associations.v4.basicApi.create('pets', '14348736435', 'contacts', '44671233162', [{ associationCategory: AssociationSpecAssociationCategoryEnum.UserDefined, associationTypeId: 19 }])
    //
    //console.log(results1)

    //const results = await hubspotClient.crm.associations.v4.schema.definitionsApi.getAll('pets', 'contacts')

    //const results = await hubspotClient.crm.associations.v4.basicApi.getPage('pets', '14348736435', 'contacts')

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

    const contactFromHubspot = await hubspotClient.crm.objects.basicApi.getById('contacts', contactId)

    const contact = await db.contact.create({
      data: {
        name: contactFromHubspot.properties.firstname + ' ' + contactFromHubspot.properties.lastname.split(' ')[0],
        email: contactFromHubspot.properties.email
      }
    })

    const breedRecord = await db.breed.create({
      data: {
        name: breed,
      }
    })

    const pet = await db.pet.create({
      data: {
        name,
        age,
        breedId: breedRecord.id,
        hubSpotId: 'id',
        contactId: contact.id
      }
    })

    return response.status(201).json(pet)
  }
}

export default CreatePetController

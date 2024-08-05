import { CreatePetInCRMPlatform } from '../protocols'
import hubspotClient from '../services/hubspot-client'
import { AssociationSpecAssociationCategoryEnum } from '@hubspot/api-client/lib/codegen/crm/deals/models/AssociationSpec'

type Properties = {
  name: string
  age: string
  breed: string
  contactId: string
}

const associationCategory = AssociationSpecAssociationCategoryEnum.UserDefined


class CreatePetInHubSpotUseCase implements CreatePetInCRMPlatform {
  async create({ contactId, ...properties }: Properties) {
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

    return {
      id: results.id
    }
  }
}

export default CreatePetInHubSpotUseCase

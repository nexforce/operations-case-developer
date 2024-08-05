import { GetContactByIdFromCRMPlatform } from '../protocols'
import hubspotClient from '../services/hubspot-client'


type Contact = {
  id: string
  name: string
  email: string
  firstname: string
  lastname: string
}

class GetContactByIdFromHubSpotUseCase implements GetContactByIdFromCRMPlatform {
  async getById(contactId: string) {
    const contactFromHubspot = await hubspotClient.crm.objects.basicApi.getById('contacts', contactId)

    const contact: Contact = {
      id: contactFromHubspot.id,
      name: contactFromHubspot.properties ? contactFromHubspot.properties.name ?? '' : '',
      email: contactFromHubspot.properties ? contactFromHubspot.properties.email ?? '' : '',
      firstname: contactFromHubspot.properties ? contactFromHubspot.properties.firstname ?? '' : '',
      lastname: contactFromHubspot.properties ? contactFromHubspot.properties.lastname ?? '' : ''
    }

    return contact
  }
}

export default GetContactByIdFromHubSpotUseCase 

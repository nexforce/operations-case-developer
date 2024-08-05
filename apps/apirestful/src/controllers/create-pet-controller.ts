import { Request, Response } from 'express'
import { CreatePetInCRMPlatform, GetContactByIdFromCRMPlatform } from '../protocols'
import { PetRepository } from '../repositories/pet-repository'
import { ContactRepository } from '../repositories/contact-repository'

class CreatePetController {
  private createPetInHubSpot: CreatePetInCRMPlatform
  private getContactIdFromHubSpot: GetContactByIdFromCRMPlatform
  private petRepository: PetRepository
  private contactRepository: ContactRepository

  constructor(
    createPetInHubSpotInput: CreatePetInCRMPlatform,
    getContactIdFromHubSpotInput: GetContactByIdFromCRMPlatform,
    petRepositoryInput: PetRepository,
    contactRepositoryInput: ContactRepository,
  ) {
    this.createPetInHubSpot = createPetInHubSpotInput
    this.getContactIdFromHubSpot = getContactIdFromHubSpotInput
    this.petRepository = petRepositoryInput
    this.contactRepository = contactRepositoryInput

    this.handle = this.handle.bind(this);
  }

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

    if (!age) {
      return response.status(400).send({
        message: 'Age is not provided. Ensure a value greater than 0 is provided.'
      })
    }

    if (!breed) {
      return response.status(400).send({
        message: 'Breed is not provided. Ensure a value of type uuid is provided.'
      })
    }

    if (!contactId) {
      return response.status(400).send({
        message: 'ContactId is not provided. Ensure a value of type integer is provided. Read more about Contacts from HubSpot'
      })
    }

    const properties = { name, age: age.toString(), breed, contactId }

    const results = await this.createPetInHubSpot.create(properties)

    const contactFromHubspot = await this.getContactIdFromHubSpot.getById(contactId)

    const contactIdFromHubSpot = contactFromHubspot.id

    const contact = await this.contactRepository.create({
      name: contactFromHubspot.firstname + ' ' + contactFromHubspot.lastname.split(' ')[0],
      email: contactFromHubspot.email,
      hubSpotId: contactIdFromHubSpot
    })

    const petIdFromHubSpot = results.id

    const pet = await this.petRepository.create({
      name,
      age,
      breed: breed,
      hubSpotId: petIdFromHubSpot,
      contactId: contact.id
    })

    return response.status(201).json(pet)
  }
}

export default CreatePetController

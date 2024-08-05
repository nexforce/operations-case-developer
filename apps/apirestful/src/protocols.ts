type Properties = {
  name: string
  age: string
  breed: string
  contactId: string
}

type CreatePetResult = {
  id: string
}

export interface CreatePetInCRMPlatform {
  create: (properties: Properties) => Promise<CreatePetResult>
}

type Contact = {
  id: string
  name: string
  email: string
  firstname: string
  lastname: string
}

export interface GetContactByIdFromCRMPlatform {
  getById: (contactId: string) => Promise<Contact>
}

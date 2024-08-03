import {  Contact } from "@prisma/client";
import { ContactRepository, CreateContactData } from "./contact-repository";

export class InMemoryContactRepository implements ContactRepository{
    private contacts: Contact[] = [];

    async create(data: CreateContactData): Promise<Contact>  {
        const contact = {
            id: Math.random().toString(36).substring(2, 9),
            name: data.name,
            email: data.email,
            hubSpotId: data.hubSpotId,
            phone_number: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        } 

        this.contacts.push(contact) 

        return contact 
    }
}

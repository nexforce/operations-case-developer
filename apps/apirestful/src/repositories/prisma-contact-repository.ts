import {  Contact } from "@prisma/client";
import { ContactRepository, CreateContactData } from "./contact-repository";
import { db } from '../services/db/client'

export class PrismaContactRepository implements ContactRepository{
  async create(data: CreateContactData): Promise<Contact>  {
    const contact = await db.contact.create({ data })

    return contact
  }
}

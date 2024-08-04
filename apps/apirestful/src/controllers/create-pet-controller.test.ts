import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '../app'
import CreatePetController from './create-pet-controller'
import { CreatePetInCRMPlatform, GetContactByIdFromCRMPlatform } from '../protocols'
import { connect, disconnect, eraseRecords, createClient } from '../services/db/client'
import { PrismaClient } from '@prisma/client'
import { PrismaPetRepository } from '../repositories/prisma-pet-repository'
import { PrismaContactRepository } from '../repositories/prisma-contact-repository'
import { PrismaBreedRepository } from '../repositories/prisma-breed-repository'
import { Pet } from '../data/pet'
import { AllPropertiesOptional } from '../utils/types/all-undefined'
import { makeCreatePetControllerTest } from '../factories/make-create-pet-controller-test'

type PetWithPropertiesOptional = AllPropertiesOptional<Pet>

let dbClient: PrismaClient | undefined = undefined

describe('Create Pet Controller', () => {
  beforeAll(async () => {

    dbClient = createClient()

    await connect(dbClient)

    const createPetController = makeCreatePetControllerTest()

    app.post('/pet', createPetController.handle)

    console.log(process.env['DATABASE_URL'])
  })

  afterAll(async () => {
    if (!dbClient) {
      return
    }

    await disconnect(dbClient)
    await eraseRecords(dbClient)
  })

  describe('given a invalid body', () => {
    it('when name is not provided, then should get bad request error', async () => {
      const pet: PetWithPropertiesOptional = {
        age: 1,
        breed: 'Pelo Curto Brasileiro',
        contactId: '821172829'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.statusCode).toBe(400)
    })

    it('when name is not provided, then should get bad request error message', async () => {
      const pet: PetWithPropertiesOptional = {
        age: 1,
        breed: 'Pelo Curto Brasileiro',
        contactId: '821172829'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.body).toEqual({
        message: 'Name is not provided. Ensure a non-empty text is provided.'
      })
    })

    it('when age is not provided, then should get bad request error', async () => {
      const pet: PetWithPropertiesOptional = {
        name: 'Ella',
        breed: 'Pelo Curto Brasileiro',
        contactId: '821172829'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.statusCode).toBe(400)
    })

    it('when age is not provided, then should get bad request error message', async () => {
      const pet: PetWithPropertiesOptional = {
        name: 'Ella',
        breed: 'Pelo Curto Brasileiro',
        contactId: '821172829'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.body).toEqual({
        message: 'Age is not provided. Ensure a value greater than 0 is provided.'
      })
    })

    it('when breed is not provided, then should get bad request error', async () => {
      const pet: PetWithPropertiesOptional = {
        name: 'Ella',
        age: 1,
        contactId: '821172829'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.statusCode).toEqual(400)
    })

    it('when breed is not provided, then should get bad request error message', async () => {
      const pet: PetWithPropertiesOptional = {
        name: 'Ella',
        age: 1,
        contactId: '821172829'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.body).toEqual({
        message: 'BreedId is not provided. Ensure a value of type uuid is provided.'
      })
    })

    it('when contactId is not provided, then should get bad request error', async () => {
      const pet: PetWithPropertiesOptional = {
        name: 'Ella',
        age: 1,
        breed: 'Pelo Curto Brasileiro'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.statusCode).toEqual(400)
    })

    it('when contactId is not provided, then should get bad request error message', async () => {
      const pet: PetWithPropertiesOptional = {
        name: 'Ella',
        age: 1,
        breed: 'Pelo Curto Brasileiro'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.body).toEqual({
        message: 'ContactId is not provided. Ensure a value of type integer is provided. Read more about Contacts from HubSpot'
      })
    })
  })

  describe('given a valid body', () => {
    it('should get created', async () => {
      const pet: Pet = {
        name: 'Ella',
        age: 1,
        breed: 'Pelo Curto Brasileiro',
        contactId: '44671233162'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.status).toEqual(201)
    })
  })
})

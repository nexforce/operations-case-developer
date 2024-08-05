import { it, describe, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { connect, disconnect, eraseRecords, createClient } from '../services/db/client'
import request from 'supertest'
import { PrismaClient } from '@prisma/client'
import app from '../app'
import ListPetsController from './list-pets-controller'
import { Pet } from '../data/pet'
import { WithTimestamps } from '../utils/types/with-timestamps'
import { PrismaPetRepository } from '../repositories/prisma-pet-repository'
import { makeCreatePetControllerTest } from '../factories/make-create-pet-controller-test'

let dbClient: PrismaClient | undefined = undefined

type GetResponse = {
  items: WithTimestamps<Pet>[],
  totalItems: number,
  totalPages: number,
  currentPage: number,
  pageSize: number
}

describe('List Pets Controller', () => {
  beforeAll(async () => {
    dbClient = createClient()
    await connect(dbClient)
    const petRepository = new PrismaPetRepository()
    const listPetsController = new ListPetsController(petRepository)

    app.get('/pet', listPetsController.handle)

    const createPetController = makeCreatePetControllerTest()

    app.post('/pet', createPetController.handle)

  })

  afterEach(async () => {
    if (!dbClient) {
      return
    }

    await eraseRecords(dbClient)
  })

  afterAll(async () => {
    if (!dbClient) {
      return
    }

    await disconnect(dbClient)
  })

  describe('when is created a pet', () => {
    it('should return the data of pet created', async () => {
      const pet: Pet = {
        name: 'Ella',
        age: 1,
        breed: 'Pelo Curto Brasileiro',
        contactId: '44671233162'
      }

      await request(app)
        .post('/pet')
        .send(pet)

      const response = await request(app).get('/pet').send()

      const petResponse = {
        name: pet.name,
        age: pet.age,
        breed: 'Pelo Curto Brasileiro'
      }

      const responseBody: GetResponse = response.body
      expect(responseBody.items).toEqual(expect.arrayContaining([
        expect.objectContaining(petResponse)
      ]))
    })
  })

  describe('when is server running with success', () => {
    it('should return status ok', async () => {
      const response = await request(app).get('/pet').send()

      expect(response.statusCode).toEqual(200)
    })

    it('should return data of pagination', async () => {
      const response = await request(app).get('/pet').send()

      const responseBody: GetResponse = response.body
      expect(responseBody).toEqual(expect.objectContaining({
        items: expect.any(Array),
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
        currentPage: 1,
        pageSize: 10
      }))
    })
  })

  describe('when breed filter is specified', () => {
    describe('with invalid value', () => {
      it('should return a bad request error', async () => {
        const breed = ''

        const response = await request(app).get(`/pet?breed=${breed}`).send()

        expect(response.statusCode).toBe(400)
      })

      it('should return a bad request error message', async () => {
        const breed = ''

        const response = await request(app).get(`/pet?breed=${breed}`).send()

        expect(response.body).toEqual({
          message: 'Expected a valid string as value for \'breed\' query param'
        })
      })
    })

    describe('with valid value', () => {
      it('should return a pet data with ok', async () => {
        const pet: Pet = {
          name: 'Ella',
          age: 1,
          breed: 'Pelo Curto Brasileiro',
          contactId: '44671233162'
        }

        await request(app)
          .post('/pet')
          .send(pet)

        const breed = pet.breed

        const response = await request(app).get(`/pet?breed=${breed}`).send()

        const responseBody: GetResponse = response.body

        expect(response.statusCode).toBe(200)
        expect(responseBody.items).toEqual(expect.arrayContaining([
          expect.objectContaining({
            breed
          })
        ]))
      })
    })
  })

})
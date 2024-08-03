import { it, describe, expect } from 'vitest'
import request from 'supertest'
import app from '../app'

type Pet = {
  name?: string
  age?: number
  breed?: string
  contactId?: string
}

describe('Create Pet Controller', () => {
  describe('given a invalid body', () => {
    it('when name is not provided, then should get bad request error', async () => {
      const pet: Pet = {
        age: 1,
        breed: 'Pelo Curto Brasileiro',
        contactId: '821172829'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.statusCode).toBe(400)
    })

    it('when name is not provided, then should get bad request error message', async () => {
      const pet: Pet = {
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
      const pet: Pet = {
        name: 'Ella',
        breed: 'Pelo Curto Brasileiro',
        contactId: '821172829'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.statusCode).toBe(400)
    })

    it('when age is not provided, then should get bad request error message', async () => {
      const pet: Pet = {
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
      const pet: Pet = {
        name: 'Ella',
        age: 1,
        contactId: '821172829'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.statusCode).toEqual(400)
    })

    it('when breed is not provided, then should get bad request error message', async () => {
      const pet: Pet = {
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
      const pet: Pet = {
        name: 'Ella',
        age: 1,
        breed: 'Pelo Curto Brasileiro'
      }

      const response = await request(app).post('/pet').send(pet)

      expect(response.statusCode).toEqual(400)
    })
  })
})

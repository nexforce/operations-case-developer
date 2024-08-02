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
  })
})
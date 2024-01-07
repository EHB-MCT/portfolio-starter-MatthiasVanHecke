const request = require('supertest')
const app = require('../../app.js')
const { v4: uuidv4 } = require('uuid')
const knexfile = require('../../db/knexfile.js')
const knex = require('knex')(knexfile.development)

let insertedArtist
let insertedRecord
let exampleArtwork
let exampleArtist

beforeAll(async () => {
    try {
        const artistUuid = uuidv4()
        exampleArtist = {
          artist_name: 'Vincent van Gogh',
          uuid: artistUuid,
          birthyear: '1890',
        }

    insertedArtist = await knex('artists').insert(exampleArtist).returning('*')

    exampleArtwork = {
        title: 'De Schreeuw',
        artist_uuid: insertedArtist[0].uuid,
        image_url: 'https://example.com/De_Sterrennacht.png',
        location: 'm8dlkjlJlfmqslK02',
    }
    insertedRecord = await knex('artworks').insert({ ...exampleArtwork }).returning('*')
    exampleArtwork.id = insertedRecord[0].id
    } catch (error) {
      console.log(error)
    }
})

afterAll(async () => {
    await knex('artworks').where({ id: exampleArtwork.id }).del()
    await knex('artists').where({ uuid: exampleArtist.uuid }).del()
    await knex.destroy()
})

describe('DELETE /artists/:id', () => {
    test('error 400 if negative ID provided', async () => {
        const response = await request(app).delete('/artists/-1')
        console.log(response.body)
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('An invalid ID was provided')
    })
  
    test('error 404 if artist not found', async () => {
      const nonExistentId = 1000000
      const response = await request(app).delete(`/artists/${nonExistentId}`)
      expect(response.status).toBe(404)
    })
  
    test('should delete an artist successfully', async () => {
      const response = await request(app).delete(`/artists/${insertedArtist[0].id}`)
      expect(response.status).toBe(204)
    })
})
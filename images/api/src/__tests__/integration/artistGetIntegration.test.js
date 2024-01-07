const request = require('supertest')
const app = require('../../app.js')
const { v4: uuidv4 } = require('uuid')
const knexfile = require('../../db/knexfile.js')
const knex = require('knex')(knexfile.development)

let insertedArtist
let insertedRecord
let exampleArtwork
let exampleArtist

describe('GET /artists/:id', () => {
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
        title: 'De Sterrennacht',
        artist_uuid: insertedArtist[0].uuid,
        image_url: 'https://example.com/De_Sterrennacht.png',
        location: 'm8dlkjlJlfmqslK02',
      }
      insertedRecord = await knex('artworks').insert({ ...exampleArtwork }).returning('*')
      exampleArtwork.id = insertedRecord[0].id
    } catch (error) {
      console.error(error)
    }
  })

  afterAll(async () => {
    await knex('artworks').where({ id: exampleArtwork.id }).del()
    await knex('artists').where({ uuid: exampleArtist.uuid }).del()
    await knex.destroy()
  })

  test('GET all artists', async () => {
    const response = await request(app).get('/artists')

    expect(response.status).toBe(200)
    const artist1 = response.body.find((artist) => artist.artist_name === 'Vincent van Gogh')
    expect(artist1).toBeDefined()
  })

  test('GET artist by ID', async () => {
    const response = await request(app).get(`/artists/${insertedArtist[0].id}`)

    expect(response.status).toBe(200)
    expect(response.body.artist_name).toBe('Vincent van Gogh')
  })

  test('error when invalid ID', async () => {
    const invalidID = 1000000
    const response = await request(app).get(`/artists/${invalidID}`)

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Artist not found')
  })

  test('error when given a negative ID', async () => {
    const negativeID = -1
    const response = await request(app).get(`/artists/${negativeID}`)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('An invalid ID was provided')
  })
})

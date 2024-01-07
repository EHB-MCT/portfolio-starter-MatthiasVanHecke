const request = require('supertest')
const app = require('../../app.js')
const { v4: uuidv4 } = require('uuid')
const knexfile = require('../../db/knexfile.js')
const knex = require('knex')(knexfile.development)

let insertedRecord
let exampleArtwork
let exampleArtist

describe('POST /artists/:id', () => {
  beforeAll(async () => {
    try {
      const artistUuid = uuidv4()
      exampleArtist = {
        artist_name: 'Vincent van Gogh',
        uuid: artistUuid,
        birthyear: '1890',
      }

      await knex('artists').insert({ ...exampleArtist })

      exampleArtwork = {
        title: 'De Sterrennacht',
        artist_uuid: exampleArtist.uuid,
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
    try {
      if (exampleArtwork.id) {
        await knex('artworks').where({ id: exampleArtwork.id }).del()
        await knex.destroy()
      }
    } catch (error) {
      console.error(error)
    }
  })

  test('create new artist', async () => {
    const response = await request(app)
      .post('/artists')
      .send({
        artist_name: 'New Artist',
        uuid: uuidv4(),
        birthyear: '1990',
      })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Artist created successfully!')
    expect(response.body.artist_uuid).toBeDefined()

    await request(app).delete(`/artists/${response.body.artist_uuid}`)
  })

  test('error when one or more fields are missing', async () => {
    const response = await request(app)
      .post('/artists')
      .send("Missing some fields. Please fill these in.")

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
  })

  test('error when name artist_name field is empty', async () => {
    const response = await request(app)
      .post('/artists')
      .send({
        artist_name: '',
        uuid: uuidv4(),
        birthyear: "1950"
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Missing some fields. Please fill these in.')
  })

  test('error when artist_name is invalid', async () => {
    const response = await request(app)
      .post('/artists')
      .send({
        artist_name: null,
        uuid: uuidv4(),
        birthyear: "1990"
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Missing some fields. Please fill these in.')
  })

  test('error when artist property is missing', async () => {
    const response = await request(app)
      .post('/artists')
      .send({
        uuid: uuidv4(),
        birthyear: "2000"
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Missing some fields. Please fill these in.')
  })
})

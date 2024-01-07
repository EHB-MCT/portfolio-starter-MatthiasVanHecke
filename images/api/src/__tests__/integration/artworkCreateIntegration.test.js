const request = require('supertest')
const app = require('../../app.js')
const { v4: uuidv4 } = require("uuid")
const knexfile = require('../../db/knexfile.js')
const knex = require("knex")(knexfile.development)

let insertedArtist
let exampleArtwork
let exampleArtist

describe('POST /artworks/:id', () => {
  beforeAll(async () => {
    const artistUuid = uuidv4()
    exampleArtist = {
      artist_name: 'Vincent van Gogh',
      uuid: artistUuid,
      birthyear: '1890',
    }

    insertedArtist = await knex('artists').insert(exampleArtist).returning("*")

    exampleArtwork = {
        title: 'De Sterrennacht',
        artist_uuid: exampleArtist.uuid,
        image_url: 'https://example.com/De_Sterrennacht.png',
        location: 'm8dlkjlJlfmqslK02',
      }
  })

  afterAll(async () => {
    await knex('artists').where({ id: insertedArtist[0].id }).del()
    await knex.destroy()
  })

  test('CREATE new artwork', async () => {
    const response = await request(app)
      .post('/artworks')
      .send({
        title: 'De Sterrennacht',
        image_url: 'https://example.com/De_Sterrennacht.png',
        location: 'm8dlkjlJlfmqslK02',
      })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Artwork created successfully')
    expect(response.body.artwork.title).toBe('De Sterrennacht')
    expect(response.body.artwork.image_url).toBe('https://example.com/De_Sterrennacht.png')
    expect(response.body.artwork.location).toBe('m8dlkjlJlfmqslK02')
    
    await request(app).delete(`/artworks/${response.body.artwork.id}`)
  })

  test('error when invalid data', async () => {
    const response = await request(app).post('/artworks')
    expect(response.status).toBe(400)

  })

  test('error 401 when wrong artwork', async () => {
    const response = await request(app).get(`/artworks/invalid_id`)
    expect(response.status).toBe(400)  // Change this line
    expect(response.body.message).toBe('An invalid ID was provided')
  })
})
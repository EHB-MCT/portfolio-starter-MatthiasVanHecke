const request = require('supertest')
const app = require('../../app.js')
const { v4: uuidv4 } = require('uuid')
const knexfile = require('../../db/knexfile.js')
const knex = require('knex')(knexfile.development)

let insertedArtist
let insertedRecord
let exampleArtwork
let exampleArtist

describe('UPDATE /artists/:id', () => {
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
      console.log(error)
    }
  })

  afterAll(async () => {
    await knex('artworks').where({ id: exampleArtwork.id }).del()
    await knex('artists').where({ uuid: exampleArtist.uuid }).del()
    await knex.destroy()
  })

  test('UPDATE an artwork', async () => {
    const updatedData = {
      artist_name: 'Updated Artist',
      birthyear: "1900"
    }
  
    const response = await request(app)
      .put(`/artists/${insertedArtist[0].id}`)
      .send(updatedData)
      .expect(200)
    expect(response.text).toBe('Artist updated successfully!')
  
    const updatedArtist = await knex('artists').where({ id: insertedArtist[0].id }).first()
  
    expect(updatedArtist.artist_name).toBe(updatedData.artist_name)
    expect(parseInt(updatedArtist.birthyear, 10)).toBe(parseInt(updatedData.birthyear, 10))
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
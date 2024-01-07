const request = require('supertest')
const app = require('../../app.js')
const { v4: uuidv4 } = require("uuid")
const knexfile = require('../../db/knexfile.js')
const knex = require("knex")(knexfile.development)

let insertedArtist
let insertedRecord
let exampleArtwork
let exampleArtist

describe('DELETE /artworks/:id', () => {
  beforeAll(async () => {
    try {
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

      insertedRecord = await knex('artworks').insert({ ...exampleArtwork }).returning("*")
      exampleArtwork.id = insertedRecord[0].id
    } catch (error) {
      console.error('Error during setup:', error)
    }
  })

  afterAll(async () => {
    await knex('artworks').where({ id: exampleArtwork.id }).del()
    await knex('artists').where({ uuid: exampleArtist.uuid }).del()
    await knex.destroy()
  })

  test('DELETE artwork', async () => {
    const response = await request(app).delete(`/artworks/${exampleArtwork.id}`)

    expect(response.status).toBe(204)

    const knexRecord = await knex("artworks").select("*").where("id", exampleArtwork.id)

    expect(knexRecord.length).toBe(0)
  })

  test('error 404 when trying to delete a non-existing artwork', async () => {
    const response = await request(app).delete(`/artworks/${exampleArtwork.id}`)

    expect(response.status).toBe(404)
  })

  test('error 401 when trying to delete with an invalid ID', async () => {
    const response = await request(app).delete(`/artworks/invalid_id`)

    expect(response.status).toBe(400)
  })
})

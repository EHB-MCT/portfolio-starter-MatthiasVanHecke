const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const knex = require('knex')
const { v4: uuidv4 } = require('uuid')

const { checkArtworkTitle } = require('../helpers/artworkEndpointHelper')
const { checkArtworkImage } = require('../helpers/artworkEndpointHelper')
const { checkArtworkLocation } = require('../helpers/artworkEndpointHelper')

const knexConfig = require('./../db/knexfile')

const db = knex(knexConfig.development)

// Create a new artwork
router.post('/', async (req, res) => {
  try {
    const { title, image_url, location_geohash } = req.body

    // Generate a UUID for the artist
    const artist_uuid = uuidv4()

    // Insert the artist into the "artists" table
    await db('artists').insert({ uuid: artist_uuid })

    // Insert the artwork into the "artworks" table
    const insertedData = await db('artworks')
      .insert({ title, artist_uuid, image_url, location_geohash })
      .returning(['id', 'title', 'artist_uuid', 'image_url', 'location_geohash'])

    const insertedArtwork = insertedData[0]

    return res.status(200).json({
      message: 'Artwork created successfully',
      artwork: insertedArtwork,
    })
  } catch (error) {
    console.error('Error creating artwork:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Retrieve all artworks
router.get('/', (req, res) => {
  db('artworks')
    .select()
    .then((artworks) => res.json(artworks))
    .catch((error) => res.status(500).json({ error }))
})

// Read One
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  if (id >= 0 && typeof id === 'number' && id < 100000000) {
    try {
      const artwork = await db('artworks').where({ id }).first()
      if (!artwork) {
        return res.status(404).json({ error: 'Artwork not found' })
      }
      return res.json(artwork)
    } catch (err) {
      return res.status(500).json({ error: 'Error retrieving artwork' })
    }
  } else {
    return res.status(400).json({ message: 'An invalid ID was provided' })
  }
})

// Update an artwork
router.put('/:id', async (req, res) => {
  const { title, artist_uuid, image_url, location_geohash } = req.body
  const id = req.params.id

  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ message: 'Invalid artwork ID' })
  }

  try {
    const existingArtwork = await db('artworks').where({ id }).first()

    if (!existingArtwork) {
      return res.status(404).json({ error: 'Artwork not found' })
    }

    await db('artworks')
      .where({ id })
      .update({ title, artist_uuid, image_url, location_geohash })

    return res.status(200).send('Artwork updated successfully')
  } catch (error) {
    console.error('Error updating artwork:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Delete an artwork
router.delete('/:id', (req, res) => {
  const artworkId = req.params.id

  if (isNaN(artworkId) || artworkId < 0 || artworkId >= 9999999) {
    // Invalid ID provided
    return res.status(400).json({ error: 'Invalid ID provided' })
  }

  db('artworks')
    .where({ id: artworkId })
    .del()
    .then((deletedCount) => {
      if (deletedCount > 0) {
        // Artwork deleted successfully
        return res.status(204).send()
      } else {
        // Artwork not found, return 404
        return res.status(404).json({ error: 'Artwork not found' })
      }
    })
    .catch((error) => res.status(500).json({ error }))
})

module.exports = router
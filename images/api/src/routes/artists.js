const express = require('express')
const router = express.Router()
const knex = require('knex')
const knexConfig = require('./../db/knexfile')
const db = knex(knexConfig.development)

// Create a new artist
router.post('/', (req, res) => {
    const { artist_name, uuid, birthyear } = req.body

    if (!artist_name || !uuid || !birthyear) {
        return res.status(400).json({ error: 'Missing some fields. Please fill these in.' })
    }

    db('artists')
        .insert({ artist_name, uuid, birthyear })
        .returning('*')
        .then((data) => {
            const artist = data[0]
            return res.status(200).json({
                message: 'Artist created successfully!',
                artist_uuid: artist.uuid,
                image_url: "https://example.com/De_sterrennacht.png",
                location_geohash: "m8dlkjlJlfmqslK02"
            })
        })
        .catch((error) => {
            console.error('Error:', error)
            return res.status(500).json({ error: 'Internal server error' })
        })
})

// Get one artist
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    if (id >= 0 && typeof id === 'number' && id < 100000000) {
        try {
            const artist = await db('artists').where({ id }).first()
            if (!artist) {
                return res.status(404).json({ error: 'Artist not found' })
            }
            return res.json(artist)
        } catch (error) {
            return res.status(500).json({ error: 'Cannot find artist' })
        }
    } else {
        return res.status(400).json({ message: 'An invalid ID was provided' })
    }
})

// Get all artists
router.get('/', (req, res) => {
    db('artists')
        .select()
        .then((artists) => res.json(artists))
        .catch((error) => res.status(500).json({ error }))
})

// Update an artist
router.put('/:id', async (req, res) => {
    const { artist_name, uuid, birthyear } = req.body
    const id = req.params.id

    // Check if ID is valid
    if (!Number.isInteger(Number(id)) || id < 0) {
        return res.status(400).json({ message: 'An invalid ID was provided' })
    }

    // Check if artist exists
    const existingArtist = await db('artists').where({ id }).first()
    if (!existingArtist) {
        return res.status(400).json({ error: 'An invalid ID was provided' })
    }

    db('artists')
        .where({ id })
        .update({ artist_name, uuid, birthyear })
        .then(() => res.send('Artist updated successfully!'))
        .catch((error) => res.status(500).json({ error }))
})

// Delete an artist
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    // Check if ID is valid
    if (id < 0 || !Number.isInteger(Number(id))) {
        return res.status(400).json({ error: 'An invalid ID was provided' })
    }

    try {
        const artist = await db('artists').where({ id }).first()
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' })
        }
        await db('artists').where({ id }).del()
        return res.status(204).json({ message: 'Artist deleted successfully' })
    } catch (error) {
        console.error('Delete Artist Error:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router
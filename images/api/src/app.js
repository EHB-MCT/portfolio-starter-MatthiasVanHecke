const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./db/knexfile');
const app = express();

app.use(bodyParser.json());

const artworkRouter = require('./routes/artworks.js');
app.use('/artworks', artworkRouter);
const artistsRouter = require('./routes/artists.js');
app.use('/artists', artistsRouter);

module.exports = app;

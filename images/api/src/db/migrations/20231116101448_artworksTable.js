exports.up = function(knex) {
  return knex.schema.createTable("artworks", function (table) {
    table.increments("id").primary()
    table.string("title")
    table.integer("artist_uuid")
    table.string("image_url")
    table.string("location")
  })
}


exports.down = function(knex) {
  return knex.schema.dropTable("artworks")
}
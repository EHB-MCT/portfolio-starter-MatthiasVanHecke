/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable("artworksTable", function(table) {
    table.uuid("artist_uuid")
    .references("artist.uuid")
    .onUpdate("CASCADE")
    .onDelete("CASCADE").alter()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table("artworks", function(table) {
    table.dropColumn("artists_uuid")
  })
}
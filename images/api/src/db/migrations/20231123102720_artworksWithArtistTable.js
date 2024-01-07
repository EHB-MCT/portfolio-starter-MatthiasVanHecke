/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable("artworks", function(table) {
    table.uuid("new_artist_uuid");
  })
  .then(() => {
    return knex.raw('UPDATE artworks SET new_artist_uuid = (artist_uuid::uuid)');
  })
  .then(() => {
    return knex.schema.alterTable("artworks", function(table) {
      table.uuid("artist_uuid").alter();
    });
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable("artworks", function(table) {
    table.dropColumn("new_artist_uuid");
  });
}
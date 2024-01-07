exports.up = function(knex) {
    return knex.schema.createTable("artists", function (table) {
        table.increments("id").primary()
        table.string("artist_name")
        table.string("uuid")
        table.string("nationality")
        table.integer("birthyear")
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable("artists")
}

exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments()
    tbl.string('username', 32).unique().notNullable()
    tbl.string('password', 128).notNullable()
    tbl.string('email', 128).unique().notNullable()
    tbl.timestamps()
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};

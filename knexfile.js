// Update with your config settings.

const common = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
}

module.exports = {

  development: {
    ...common,
    connection: {
      filename: './data/users.db3'
    }
  },

  testing: {
    ...common,
    connection: {
      filename: './data/testing.db3'
    },
  },

  production: {
    connection: {
      filename: './data/production.db3'
    },
  }

};

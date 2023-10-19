module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: 'devdb'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }
};
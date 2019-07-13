if (process.env.NODE_ENV === 'production') {
  require('env2')('./.env_prod')
} else {
  require('env2')('./.env')
}

const {
  env
} = process;

module.exports = {
  "development": {
    "username": env.MYSQL_USERNAME,
    "password": env.MYSQL_PASSWORD,
    "database": env.MYSQL_DB_NAME,
    "host": env.MYSQL_HOST,
    "port": env.MYSQL_PORT,
    "dialect": "mysql",
    "bcrypt": env.BCRYPT_PASSWORD,
    "secret": env.SECRET_PASSWORD,
  },
  "production": {
    "username": env.MYSQL_USERNAME,
    "password": env.MYSQL_PASSWORD,
    "database": env.MYSQL_DB_NAME,
    "host": env.MYSQL_HOST,
    "port": env.MYSQL_PORT,
    "dialect": "mysql",
    "bcrypt": env.BCRYPT_PASSWORD,
    "secret": env.SECRET_PASSWORD,
  }
}
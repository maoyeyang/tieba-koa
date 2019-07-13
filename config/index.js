const {
  env
} = process
const config = {
  host: env.HOST,
  port: env.PORT,
  bcrypt: env.BCRYPT_PASSWORD,
  secret: env.SECRET_PASSWORD
}

module.exports = config
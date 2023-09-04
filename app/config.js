const joi = require('joi')

const schema = joi.object({
  port: joi.number().default(3000),
  isDev: joi.bool().default(false),
  serviceName: joi.string()
})

const config = {
  port: process.env.PORT,
  isDev: process.env.NODE_ENV === 'production',
  serviceName: 'BNG Public Register'
}

const { err, value } = schema.validate(config, {
  abortEarly: false
})

if (err) {
  throw new Error(`Config is invalid: ${error.message}`)
}

module.exports = value

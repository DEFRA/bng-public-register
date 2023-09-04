const Joi = require('joi')

// Define config schema
const schema = Joi.object({
  connectionStr: Joi.string().when('useConnectionStr', { is: true, then: Joi.required(), otherwise: Joi.allow('').optional() }),
  storageAccount: Joi.string().required(),
  documentContainer: Joi.string().default('downloads'),
  publicRegistryJson: Joi.boolean().default('public-register-15000.json'),
  useConnectionStr: Joi.boolean().default(false),
  createContainers: Joi.boolean().default(true)
})

// Build config
const config = {
  connectionStr: process.env.PUBLIC_REGISTRY_AZURE_STORAGE_CONNECTION_STRING,
  storageAccount: process.env.PUBLIC_REGISTRY_AZURE_STORAGE_ACCOUNT_NAME,
  documentContainer: process.env.PUBLIC_REGISTRY_AZURE_STORAGE_CONTAINER,
  publicRegistryJson: process.env.PUBLIC_REGISTRY_JSON,
  useConnectionStr: process.env.PUBLIC_REGISTRY_AZURE_STORAGE_USE_CONNECTION_STRING,
  createContainers: process.env.PUBLIC_REGISTRY_AZURE_STORAGE_CREATE_CONTAINERS
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The blob storage config is invalid. ${result.error.message}`)
}

module.exports = result.value
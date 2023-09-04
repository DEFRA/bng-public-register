const { DefaultAzureCredential } = require('@azure/identity')
const { BlobServiceClient } = require('@azure/storage-blob')
const config = require('./config/storage')
let blobServiceClient
let containersInitialised

if (config.useConnectionStr) {
  console.log('Using connection string for BlobServiceClient')
  blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionStr)
} else {
  console.log('Using DefaultAzureCredential for BlobServiceClient')
  const uri = `https://${config.storageAccount}.blob.core.windows.net`
  blobServiceClient = new BlobServiceClient(uri, new DefaultAzureCredential())
}

const documentContainer = blobServiceClient.getContainerClient(config.documentContainer)

const initialiseContainers = async () => {
  if (config.createContainers) {
    console.log('Making sure blob containers exist')
    await documentContainer.createIfNotExists()
  }
  containersInitialised = true
}

const downloadJsonReport = async () => {
  containersInitialised ?? await initialiseContainers()
  const blob = await documentContainer.getBlockBlobClient(config.publicRegistryJson)
  return blob.download()
}

const getJsonReport = async () => {
  const downloadResponse = await downloadJsonReport()
  const download = await streamToText(downloadResponse.readableStreamBody)
  return download
}

const streamToText = async (readable) => {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}

module.exports = {
  blobServiceClient,
  getJsonReport,
  downloadJsonReport
}
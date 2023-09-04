const { downloadJsonReport } = require('../storage')
const storageConfig = require('../config/storage')

module.exports = {
  method: 'GET',
  path: '/download/json',
  options: {
    handler: async (_request, h) => {
      try {
        const response = await downloadJsonReport()
        if (response) {
          return h.response(response.readableStreamBody)
            .type('text/json')
            .header('Connection', 'keep-alive')
            .header('Cache-Control', 'no-cache')
            .header('Content-Disposition', `attachment;filename=${storageConfig.publicRegistryJson}`)
        }
      } catch {
        return h.response('Error downloading JSON report').code(404)
      }
    }
  }
}
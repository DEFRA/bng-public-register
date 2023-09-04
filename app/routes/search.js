const { getJsonReport } = require('../storage')
const storageConfig = require('../config/storage')

module.exports = {
  method: 'GET',
  path: '/search',
  options: {
    handler: async (_request, h) => {
        const response = await getJsonReport()
        const parseResponse = JSON.parse(response)

        const queryValues = _request.query
        const filters = [] 

        for (const key in queryValues) {
          if (Object.hasOwnProperty.bind(queryValues)(key)) {
            const newObj = { [key]: queryValues[key] };
            filters.push(newObj);
          }
        }

        const results = parseResponse?.BNGPublicRegister.BNGSite.filter(p => 
          filters.every(f=> Object.keys(f).every(k => p[k] === f[k]))
        )

        return h.response(results).code(200)
    }
  }
}
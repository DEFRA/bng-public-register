const { getJsonReport } = require('../storage')
const ViewModel = require('./models/search')

module.exports = [{
  method: 'GET',
  path: '/search',
  handler: async (request, h) => {
    return h.view('search', new ViewModel())
  }
},
{
  method: 'GET',
  path: '/search/query',
  options: {
    handler: async (_request, h) => {
      const response = await getJsonReport()
      const parseResponse = JSON.parse(response)

      const bngReference = _request.query.bng_reference
      const queryValues = _request.query
      const filters = []

      for (const key in queryValues) {
        if (Object.hasOwnProperty.bind(queryValues)(key)) {
          const newObj = { [key]: queryValues[key] }
          filters.push(newObj)
        }
      }

      const results = parseResponse?.BNGPublicRegister.BNGSite.filter(p =>
        filters.every(f => Object.keys(f).every(k => p[k] === f[k]))
      )

      return h.view('search-results', { results, bngReference })
    }
  }
}, {
  method: 'GET',
  path: '/search/results/details/{bngReference}',
  handler: async (request, h) => {
    const bngReference = request.params.bngReference
    return h.view('search-details', { bngReference })
  }
}]

const routes = [].concat(
  require('../routes/index'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/assets')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _) => {
      server.route(routes)
    }
  }
}

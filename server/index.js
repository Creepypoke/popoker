const express = require('express')

const config = require('./config')
const loggers = require('./loggers')

const logger = loggers.get('server')

const app = express()

// log every http request with response time
app.use(loggers.expressHTTP)

app.use(express.json({
  limit: '5kb',
}))

app.use(require('./api'))

// log every unhandled error
app.use(loggers.expressError)

app.listen(
  config.get('server.port'),
  () => {
    logger.info(`Server started on port ${config.get('server.port')}`)
  }
)

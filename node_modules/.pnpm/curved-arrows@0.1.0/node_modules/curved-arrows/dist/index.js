
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./curved-arrows.cjs.production.min.js')
} else {
  module.exports = require('./curved-arrows.cjs.development.js')
}

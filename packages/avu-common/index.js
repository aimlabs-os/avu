'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/avu-common.cjs.prod.js')
} else {
  module.exports = require('./dist/avu-common.cjs.js')
}

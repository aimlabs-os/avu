const path = require('path')
const alias = {
  '/@/': path.resolve(__dirname, 'src/'),
}

export default {
  alias,
  rollupInputOptions: {
    input: path.resolve(__dirname, 'src/index.ts')
  },
  rollupOutputOptions: {
    dir: './dist'
  },
  // emitIndex: false,
  assetDir: '/',
  sourcemap: true
}
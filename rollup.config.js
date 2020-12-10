import sucrase from '@rollup/plugin-sucrase'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const plugins = [
  resolve({
    extensions: ['.js', '.ts']
  })
  , sucrase({
    exclude: ['node_modules/**']
    , transforms: ['typescript']
  })
  , terser()
]
const format = 'cjs'

export default [
  {
    input: 'src/main/preload.ts'
    , output: {
      file: 'build/main/preload.js'
      , format
    }
    , plugins
  }
  , {
    input: 'src/main/index.ts'
    , external: [
      'path'
      , 'electron'
      , 'debug'
      , 'dotenv'
      , 'electron-devtools-installer'
    ]
    , plugins
    , output: {
      file: 'build/main/index.js'
      , format
    }
    , watch: {
      chokidar: {
        // ignored: '*.vue'
      }
    }
  }
  /*
  , {
    input: 'src/renderer/index.ts'
    , output: {
      file: 'build/renderer/index.js'
      , format
    }
    , plugins
  }
  */
]

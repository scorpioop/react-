import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import sass from 'rollup-plugin-sass'
import serve from 'rollup-plugin-serve'
const path = require('path');
const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

const overrides = {
  compilerOptions: { declaration: false },
  exclude: ["setupTests.ts"]
}
const config = {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'es'
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),

    typescript({ tsconfigOverride: overrides }),
    sass({ output: 'dist/index.css' }),
    serve({
      port: 3000,
      contentBase: [resolveFile('dist')]
    })
  ],
  // external: ['react', 'react-dom', 'axios']
}

export default config
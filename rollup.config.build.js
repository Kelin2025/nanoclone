import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify-es'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    name: 'nanoclone',
    file: 'dist/index.js',
    format: 'es'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({ jsnext: true }),
    cjs(),
    uglify()
  ]
}

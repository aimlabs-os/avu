import cjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
// import less from 'rollup-plugin-less'
import nodeResolve from './scripts/resolve'
import VuePlugin from 'rollup-plugin-vue'
import babel from './scripts/babel'
import CleanCSS from 'clean-css'
import fs from 'fs'

const isProduction = !process.env.ROLLUP_WATCH

export default () => {
  let config = [
    {
      input: 'src/index.ts',
      output: { format: 'esm', file: 'dist/avu.esm.js', exports: 'named' },
      external: (id) => {
        return /core|^vue$/.test(id)
      },
      plugins: [
        nodeResolve(),
        VuePlugin(),
        cjs(),
        // less({
        //   output: (css) => {
        //     const newcss = new CleanCSS().minify(css)
        //     fs.writeFile('dist/avu.css', newcss.styles, () => {})
        //     return newcss.styles
        //   },
        // }),
        babel(),
        terser(),
      ],
    },
    {
      input: 'src/index.ts',
      output: { format: 'cjs', file: 'dist/avu.cjs.js', exports: 'named' },
      external: (id) => {
        return /core|^vue$/.test(id)
      },
      plugins: [nodeResolve(), VuePlugin(), cjs(), /*less({output: false}),*/ babel(), terser()],
    },
    {
      input: 'src/index.ts',
      output: {
        format: 'umd',
        file: 'dist/avu.umd.js',
        name: 'Avu',
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
      external: ['vue'],
      plugins: [nodeResolve(), VuePlugin(), cjs(), /*less({output: false}),*/ babel(false, true)],
    },
  ]

  config.forEach((c) => c.plugins.push(filesize({ showBrotliSize: true })))

  config
    .filter((c) => c.output.format === 'umd')
    .forEach((c) => {
      config.push({
        ...c,
        output: {
          ...c.output,
          file: c.output.file.replace(/\.js/g, '.min.js'),
        },
        plugins: [...c.plugins, terser()],
      })
    })

  // if (!isProduction) {
  //   config = config.filter((c) => c.output.format === 'esm')
  // }

  return config
}
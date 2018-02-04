// @noflow
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

// const ensureArray = maybeArr => Array.isArray(maybeArr) ? maybeArr : [maybeArr];

// const createConfig = ({
//   input = 'src/index.js',
//   output,
//   umd = false,
//   env,
// } = {}) => ({
//   input,
//   output: ensureArray(output).map(format => Object.assign(
//     {},
//     format,
//     umd
//       ? {
//         name: 'ReduxPersist',
//         sourcemap: true,
//       }
//       : {}
//   )),
//   external: umd ? [] : [
//     ...Object.keys(pkg.dependencies || {}),
//     ...Object.keys(pkg.peerDependencies || {}),
//     'react',
//   ],
//   plugins: [
//     nodeResolve({
//       jsnext: true
//     }),
//     babel({
//       exclude: 'node_modules/**',
//     }),
//     umd && replace({
//       'process.env.NODE_ENV': JSON.stringify(env),
//     }),
//     umd && env === 'production' && uglify({
//       compress: {
//         pure_getters: true,
//         unsafe: true,
//         unsafe_comps: true,
//         warnings: false,
//       },
//     }),
//   ].filter(Boolean),
// })

// export default [
//   createConfig({
//     output: [
//       { file: `${pkg.main}.js`, format: 'cjs' },
//       { file: `${pkg.module}.js`, format: 'es' },
//     ],
//   }),
//   createConfig({
//     umd: true,
//     env: 'development',
//     output: {
//       file: `${pkg.main}.umd.js`,
//       format: 'umd',
//     },
//   }),
//   createConfig({
//     umd: true,
//     env: 'production',
//     output: {
//       file: `${pkg.main}.umd.min.js`,
//       format: 'umd',
//     },
//   }),
//   createConfig({
//     input: 'src/integration/react.js',
//     output: [
//       { file: `dist/${pkg.name}-react.js`, format: 'cjs' },
//       { file: `dist/${pkg.name}-react.es.js`, format: 'es' },
//     ]
//   })
// ]

const createConfig = ({
  input = 'src/index.js',
  output,
  umd = false,
  env,
} = {}) => ({
  experimentalCodeSplitting: !umd,
  input,
  output,
  external: umd ? [] : [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    'react',
  ],
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    umd && replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    umd && env === 'production' && uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  ].filter(Boolean),
})

export default [
  createConfig({
    input: ['src/index.js', 'src/integration/react.js', 'src/storage/index.js'],
    output: [
      { dir: 'lib', format: 'cjs' },
      { dir: 'es', format: 'es' },
    ],
  }),
  // createConfig({
  //   umd: true,
  //   env: 'development',
  //   output: {
  //     file: `${pkg.main}.umd.js`,
  //     format: 'umd',
  //   },
  // }),
  // createConfig({
  //   umd: true,
  //   env: 'production',
  //   output: {
  //     file: `${pkg.main}.umd.min.js`,
  //     format: 'umd',
  //   },
  // }),
  // createConfig({
  //   input: 'src/integration/react.js',
  //   output: [
  //     { file: `dist/${pkg.name}-react.js`, format: 'cjs' },
  //     { file: `dist/${pkg.name}-react.es.js`, format: 'es' },
  //   ]
  // })
]


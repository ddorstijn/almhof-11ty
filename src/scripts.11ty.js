const esbuild = require('esbuild')
const { NODE_ENV = 'production' } = process.env

const isProduction = NODE_ENV === 'production'

module.exports = class {
  data() {
    return {
      permalink: false,
      eleventyExcludeFromCollections: true
    }
  }

  async render() {
    await esbuild.build({
      entryPoints: ['src/_11ty/assets/js/homepage.js'],
      bundle: true,
      minify: isProduction,
      outdir: 'public/assets/js',
      sourcemap: !isProduction,
      target: 'esnext',
      format: 'esm',
      splitting: true
    })
  }
}

export default {

  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'DTI Registry Search',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=0.80, maximum-scale=1.5' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: process.env.NODE_ENV !== 'production' ? '/favicon.png' : '/registry-search/favicon.png' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt', 
  ],

  bootstrapVue: {
    icons: true
  },
  
  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build.optimization.splitChunks.name 
  build: {
    /***/ 
    optimization: {
        splitChunks: {                    
          chunks: 'all',
          automaticNameDelimiter: '.',
          name: undefined,
          cacheGroups: {}
        },
    }, 
    /**/

    publicPath: '/lib',
    filenames:{
      app: ({ isDev }) => isDev ? `[name].js` : `app-[contenthash:4].js`,
      chunk: ({ isDev }) => isDev ? `[name].js` : `chunk-[contenthash:4].js`      
    }
  },

  router:{
    base: '/registry-search/'
  },

  googleFonts: {
    families: {
      'Titillium+Web': {
        wght: [200, 300, 400, 600, 700, 900]
      }      
    }
  }
}

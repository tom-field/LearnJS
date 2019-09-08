const pkg = require('./package')

module.exports = {
  /*环境*/
  env: {
    BASEURL: process.env.NODE_ENV === 'production'? 'http://127.0.0.1:3001' : 'http://127.0.0.1:3001/api',
    API_PREFIX: process.env.API_PREFIX || 'dir-ws',
    AUTH_ROOT: process.env.AUTH_ROOT || 'http://127.0.0.1',
  },
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/styles/index.scss',
  ],

  /*script: [
    {
      src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
      type: "text/javascript"
    },
  ],*/

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/filters',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'bootstrap-vue/nuxt',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  proxy: [
    [
      '/api',
      {
        target: 'http://127.0.0.1:7001', // api主机
        pathRewrite: { '^/api' : '/' }
      }
    ]
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}

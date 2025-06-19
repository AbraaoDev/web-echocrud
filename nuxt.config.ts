import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['shadcn-nuxt', '@nuxtjs/google-fonts', '@nuxt/image'],
  googleFonts: {
    families: {
      'Titillium Web': [400, 600, 700],
    },
    display: 'swap',
  },
  image: {
    quality: 80,
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3333/api/v1',
    },
  },
  shadcn: {
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./com'onents/ui"
 '   */
    componentDir: './components/ui',
  },
})

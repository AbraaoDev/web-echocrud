// plugins/vue-the-mask.ts
import { defineNuxtPlugin } from '#app'
import VueTheMask from 'vue-the-mask'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use((VueTheMask as any).default || VueTheMask)
})

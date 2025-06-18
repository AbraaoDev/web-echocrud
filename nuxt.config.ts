import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["shadcn-nuxt", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "Titillium Web": [400, 700],
    },
    display: "swap",
  },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api/v1",
    },
  },
  shadcn: {
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./com'onents/ui"
 '   */
    componentDir: "./components/ui",
  },
});

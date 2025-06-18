import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["shadcn-nuxt"],
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

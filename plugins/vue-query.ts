import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 1000, // definir o stale, depois com revalidates nas actions
      },
    },
  });

  const options = { queryClient };

  nuxtApp.vueApp.use(VueQueryPlugin, options);
});

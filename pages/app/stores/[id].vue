<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import StoreCreateSheet from '~/components/store/form/Store.Create.Sheet.vue'

const route = useRoute()

definePageMeta({
  layout: false,
})

const establishmentId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})

useHead({
  title: `EchoCRUD | Lojas do Estabelecimento`,
})

function goBackToEstablishments() {
  navigateTo('/app')
}
</script>

<template>
  <div class="w-full space-y-4 mt-20 mx-auto max-w-6xl">
    <div class="flex flex-col gap-10 items-start">
      <div>
        <Button variant="outline" size="icon" @click="goBackToEstablishments">
          <ArrowLeft class="h-4 w-4" />
          <span class="sr-only">Voltar para Estabelecimentos</span>
        </Button>
      </div>
      <div class="flex justify-between items-center w-full">
        <div class="">
          <h1 class="text-2xl font-bold tracking-tight">
            Lojas do Estabelecimento {{ establishmentId }}
          </h1>
          <p class="text-muted-foreground">
            Gerencie as lojas do estabelecimento selecionado.
          </p>
        </div>

        <StoreCreateSheet :establishment-id="establishmentId" />
      </div>
    </div>
    <div class="container mx-auto">
      <StoreDatatable :establishment-id="establishmentId" />
    </div>
  </div>
</template>

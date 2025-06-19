<script setup lang="ts">
useHead({
  title: 'EchoCRUD | Gerenciar Estabelecimentos',
})

import EstablishmentDatatable from '~/components/establishment/Establishment.Datatable.vue'
import EstablishmentCreateSheet from '~/components/establishment/form/Establishment.Create.Sheet.vue'
</script>

<template>
  <div class="w-full space-y-4 mt-20">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Estabelecimentos</h1>
        <p class="text-muted-foreground">
          Gerencie os estabelecimentos cadastrados no sistema.
        </p>
      </div>
      <EstablishmentCreateSheet />
    </div>
    <div class="container mx-auto">
      <EstablishmentDatatable />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'EchoCRUD | Gerenciar Estabelecimentos',
})

import EstablishmentDatatable from '~/components/establishment/Establishment.Datatable.vue'
</script>

<template>
  <div class="container mx-auto py-10">
    <EstablishmentDatatable />
  </div>
</template>

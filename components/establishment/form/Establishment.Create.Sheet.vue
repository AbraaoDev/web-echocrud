<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import EstablishmentForm from './Establishment.Form.vue'

const isSheetOpen = ref(false)

function closeSheet() {
  isSheetOpen.value = false
}
</script>

<template>
  <Sheet v-model:open="isSheetOpen">
    <SheetTrigger as-child>
      <Button> Adicionar Estabelecimento </Button>
    </SheetTrigger>
    <SheetContent class="w-full sm:max-w-2xl overflow-y-auto">
      <SheetHeader class="mb-6">
        <SheetTitle>Adicionar Novo Estabelecimento</SheetTitle>
        <SheetDescription>
          Preencha os campos abaixo para cadastrar um novo estabelecimento no
          sistema.
        </SheetDescription>
      </SheetHeader>

      <EstablishmentForm :on-success="closeSheet" />
    </SheetContent>
  </Sheet>
</template>

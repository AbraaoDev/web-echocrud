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
import StoreForm from './Store.Form.vue'

const props = defineProps<{
  establishmentId: string
}>()

const isSheetOpen = ref(false)

function closeSheet() {
  isSheetOpen.value = false
}
</script>

<template>
  <Sheet v-model:open="isSheetOpen">
    <SheetTrigger as-child>
      <Button>Adicionar Loja</Button>
    </SheetTrigger>
    <SheetContent class="w-full sm:max-w-2xl overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Adicionar Nova Loja</SheetTitle>
        <SheetDescription>
          Preencha os campos abaixo para cadastrar uma nova loja neste
          estabelecimento.
        </SheetDescription>
      </SheetHeader>

      <StoreForm
        :establishment-id="props.establishmentId"
        :on-success="closeSheet"
      />
    </SheetContent>
  </Sheet>
</template>

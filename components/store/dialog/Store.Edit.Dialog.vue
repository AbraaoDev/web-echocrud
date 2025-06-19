<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import StoreEditForm from './Store.Edit.Form.vue'

const open = defineModel<boolean>('open')

const props = defineProps<{
  storeId: string | null
  establishmentId: string | null
}>()

function handleSuccess() {
  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Editar Loja</DialogTitle>
        <DialogDescription>
          Altere os dados da loja abaixo. Clique em salvar para aplicar as
          mudanças.
        </DialogDescription>
      </DialogHeader>

      <StoreEditForm
        v-if="storeId && establishmentId"
        :store-id="storeId"
        :establishment-id="establishmentId"
        :on-success="handleSuccess"
        class="py-4"
      />
    </DialogContent>
  </Dialog>
</template>

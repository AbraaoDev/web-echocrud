<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import EstablishmentEditForm from './Establishment.Edit.Form.vue'

const open = defineModel<boolean>('open')

const props = defineProps<{
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
        <DialogTitle>Editar Estabelecimento</DialogTitle>
        <DialogDescription>
          Altere os dados do estabelecimento abaixo. Clique em salvar para
          aplicar as mudanças.
        </DialogDescription>
      </DialogHeader>

      <EstablishmentEditForm
        v-if="establishmentId"
        :establishment-id="establishmentId"
        :on-success="handleSuccess"
        class="py-4"
      />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { FlexRender } from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useStoreTable } from './useStoreTable'
import ConfirmationDialog from '../shared/ConfirmationDialog.vue'
import StoreEditDialog from './dialog/Store.Edit.Dialog.vue'

const props = defineProps({
  establishmentId: {
    type: String,
    required: true,
  },
})

const isEditDialogOpen = ref(false)
const selectedStoreId = ref<string | null>(null)

function handleEdit(id: string) {
  selectedStoreId.value = id
  isEditDialogOpen.value = true
}

const {
  table,
  columns,
  isLoading,
  isError,
  handleConfirmDelete,
  isConfirmDialogOpen,
  isDeletePending,
} = useStoreTable({
  establishmentId: toRef(props, 'establishmentId'),
  onEdit: handleEdit,
})
</script>

<template>
  <div class="rounded-md border">
    <Table>
      <TableHeader class="bg-muted">
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="isLoading">
          <TableRow>
            <TableCell :colSpan="columns.length" class="h-24 text-center">
              Carregando lojas...
            </TableCell>
          </TableRow>
        </template>
        <template v-else-if="isError">
          <TableRow>
            <TableCell
              :colSpan="columns.length"
              class="h-24 text-center text-red-600"
            >
              Falha ao carregar as lojas.
            </TableCell>
          </TableRow>
        </template>
        <template v-else-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() && 'selected'"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colSpan="columns.length" class="h-24 text-center">
              Nenhuma loja encontrada.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>

  <div class="flex items-center justify-end space-x-2 py-4">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredRowModel().rows.length }} loja(s) nesta página.
    </div>
    <div class="space-x-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        Anterior
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        Próxima
      </Button>
    </div>
  </div>
  <ConfirmationDialog
    v-model:open="isConfirmDialogOpen"
    title="Confirmar Exclusão"
    description="Tem certeza que deseja excluir esta loja? Esta ação não pode ser desfeita."
    :is-pending="isDeletePending"
    @confirm="handleConfirmDelete"
  />
  <StoreEditDialog
    v-model:open="isEditDialogOpen"
    :store-id="selectedStoreId"
    :establishment-id="props.establishmentId"
  />
</template>

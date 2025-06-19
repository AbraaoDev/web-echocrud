<script setup lang="ts">
import { h } from 'vue'
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
import { useEstablishmentTable } from './useEstablishmentTable'
import EstablishmentEditDialog from './dialog/Establishment.Edit.Dialog.vue'

const isEditDialogOpen = ref(false)
const selectedEstablishmentId = ref<string | null>(null)

function handleEdit(id: string) {
  selectedEstablishmentId.value = id
  isEditDialogOpen.value = true
}

const { table, columns, isLoading, isError } = useEstablishmentTable({
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
              Carregando dados...
            </TableCell>
          </TableRow>
        </template>
        <template v-else-if="isError">
          <TableRow>
            <TableCell
              :colSpan="columns.length"
              class="h-24 text-center text-red-600"
            >
              Falha ao carregar os dados.
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
              Nenhum resultado encontrado.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>

  <div class="flex items-center justify-end space-x-2 py-4">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredRowModel().rows.length }} linha(s) no total.
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
    <EstablishmentEditDialog
      v-model:open="isEditDialogOpen"
      :establishment-id="selectedEstablishmentId"
    />
  </div>
</template>

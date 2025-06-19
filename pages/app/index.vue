<script setup lang="ts">
import { ref, h } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  FlexRender,
  type SortingState,
} from '@tanstack/vue-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Establishment } from '~/src/types/establishment.interfaces'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { useApiClient } from '~/src/lib/api'
import {
  deleteEstablishmentAction,
  fetchEstablishments,
} from '~/src/actions/establishment.actions'
import { toast } from 'vue-sonner'
import { isAxiosError } from 'axios'

const queryClient = useQueryClient()
const sorting = ref<SortingState>([])
const apiClient = useApiClient()

const { data, isLoading, isError } = useQuery({
  queryKey: ['establishments'],
  queryFn: () => fetchEstablishments(apiClient),
})

const { mutate: deleteEstablishment } = useMutation({
  mutationFn: (id: string) => deleteEstablishmentAction(id, apiClient),
  onSuccess: () => {
    toast.success('Estabelecimento excluído com sucesso!')
    queryClient.invalidateQueries({ queryKey: ['establishments'] })
  },
  onError: (error) => {
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 409) {
        toast.error('Exclusão não permitida', {
          description:
            'Este estabelecimento possui lojas vinculadas e não pode ser excluído.',
        })
      } else {
        const message =
          error.response.data?.message ||
          'Ocorreu um erro na comunicação com a API.'
        toast.error('Falha ao excluir', {
          description: message,
        })
      }
    } else {
      toast.error('Ocorreu um erro inesperado', {
        description:
          'Não foi possível excluir o estabelecimento. Tente novamente mais tarde.',
      })
    }
  },
})

const columnHelper = createColumnHelper<Establishment>()

const columns = [
  columnHelper.accessor('name', {
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Nome Fantasia', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('name')),
  }),
  columnHelper.accessor('corporateName', {
    header: 'Razão Social',
  }),
  columnHelper.accessor('corporateNumber', {
    header: 'CNPJ',
  }),
  columnHelper.accessor('city', {
    header: 'Cidade/UF',
    cell: ({ row }) => {
      const { city, state } = row.original
      return `${city}/${state}`
    },
  }),
  columnHelper.accessor('storeCount', {
    header: 'Nº Lojas',
  }),
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const establishment = row.original

      return h(
        'div',
        { class: 'relative text-right' },
        h(DropdownMenu, () => [
          h(DropdownMenuTrigger, () =>
            h(Button, { variant: 'ghost', class: 'h-8 w-8 p-0' }, () => [
              h('span', { class: 'sr-only' }, 'Abrir menu'),
              h(MoreHorizontal, { class: 'h-4 w-4' }),
            ])
          ),
          h(DropdownMenuContent, { align: 'end' }, () => [
            h(
              DropdownMenuItem,
              { onClick: () => goToStores(establishment.id) },
              'Ver Lojas'
            ),
            h(
              DropdownMenuItem,
              { onClick: () => editEstablishment(establishment.id) },
              'Editar'
            ),
            h(DropdownMenuSeparator),
            h(
              DropdownMenuItem,
              {
                class: 'text-red-600',
                onClick: () => handleDeleteEstablishment(establishment.id),
              },
              'Excluir'
            ),
          ]),
        ])
      )
    },
  }),
]

const tableData = computed(() => data.value ?? [])

const table = useVueTable({
  get data() {
    return tableData.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  state: {
    get sorting() {
      return sorting.value
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue
  },
})

function createEstablishment() {
  console.log('handle create estab.')
}

function editEstablishment(id: string) {
  console.log(`handle edit estab: ${id}`)
}

function goToStores(id: string) {
  console.log(`toStores: ${id}`)
}

function handleDeleteEstablishment(id: string) {
  deleteEstablishment(id)
}
</script>

<template>
  <div class="w-full space-y-4 mt-20">
    <!-- Cabeçalho da Página -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Estabelecimentos</h1>
        <p class="text-muted-foreground">
          Gerencie os estabelecimentos cadastrados no sistema.
        </p>
      </div>
      <Button class="cursor-pointer" @click="createEstablishment">
        Adicionar Estabelecimento
      </Button>
    </div>

    <!-- Tabela -->
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
          <template v-if="table.getRowModel().rows?.length">
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
          class="cursor-pointer"
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Anterior
        </Button>
        <Button
          class="cursor-pointer"
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Próxima
        </Button>
      </div>
    </div>
  </div>
</template>

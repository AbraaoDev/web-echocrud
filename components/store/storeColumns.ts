import { h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

import StoreActionsCell from './StoreActionsCell.vue'
import type { Store } from '~/src/types/store.interfaces'

const columnHelper = createColumnHelper<Store>()

interface StoreColumnActions {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export const getStoreColumns = (actions: StoreColumnActions) => [
  columnHelper.accessor('name', {
    header: ({ column }) =>
      h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Nome Fantasia', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      ),
    cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('name')),
  }),
  columnHelper.accessor('storeName', {
    header: 'Razão Social',
  }),
  columnHelper.accessor('storeNumber', {
    header: 'CNPJ',
  }),
  columnHelper.accessor('city', {
    header: 'Cidade',
  }),
  columnHelper.accessor('state', {
    header: 'UF',
  }),
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const store = row.original
      return h(StoreActionsCell, {
        store,
        onEdit: actions.onEdit,
        onDelete: actions.onDelete,
      })
    },
  }),
]

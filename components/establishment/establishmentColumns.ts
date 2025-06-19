import { h } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { ArrowUpDown, ExternalLink } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { Establishment } from '~/src/types/establishment.interfaces'
import EstablishmentActionsCell from './EstablishmentActionsCell.vue'

const columnHelper = createColumnHelper<Establishment>()

interface EstablishmentColumnActions {
  onEdit: (id: string) => void
  onGoToStores: (id: string) => void
  onDelete: (id: string) => void
}

export const getEstablishmentColumns = (
  actions: EstablishmentColumnActions
) => [
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
    cell: ({ row }) => {
      const establishmentId = row.original.id
      const storeCount = row.getValue('storeCount')
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => actions.onGoToStores(establishmentId),
          class: 'flex items-center gap-2',
        },
        () => [
          storeCount,
          h(ExternalLink, { class: 'h-4 w-4 text-muted-foreground' }),
        ]
      )
    },
  }),
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const establishment = row.original
      return h(EstablishmentActionsCell, {
        establishment,
        onEdit: actions.onEdit,
        onGoToStores: actions.onGoToStores,
        onDelete: actions.onDelete,
      })
    },
  }),
]

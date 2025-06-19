import { ref, computed } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/vue-table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { isAxiosError } from 'axios'

import { useApiClient } from '~/src/lib/api'
import {
  fetchEstablishments,
  deleteEstablishmentAction,
} from '~/src/actions/establishment.actions'
import { getEstablishmentColumns } from './establishmentColumns'

export function useEstablishmentTable() {
  const queryClient = useQueryClient()
  const apiClient = useApiClient()
  const sorting = ref<SortingState>([])

  const handleMutationError = (error: unknown) => {
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
        toast.error('Falha ao excluir', { description: message })
      }
    } else {
      toast.error('Ocorreu um erro inesperado', {
        description:
          'Não foi possível excluir o estabelecimento. Tente novamente mais tarde.',
      })
    }
  }

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
    onError: handleMutationError,
  })

  const onEdit = (id: string) => console.log(`handle edit estab: ${id}`)
  const onGoToStores = (id: string) => console.log(`toStores: ${id}`)
  const onDelete = (id: string) => deleteEstablishment(id)

  const columns = getEstablishmentColumns({ onEdit, onGoToStores, onDelete })

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

  return {
    table,
    columns,
    isLoading,
    isError,
  }
}

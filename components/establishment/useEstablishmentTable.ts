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
import type { FetchError } from 'ofetch'

import {
  fetchEstablishments,
  deleteEstablishmentAction,
} from '~/src/actions/establishment.actions'
import { getEstablishmentColumns } from './establishmentColumns'

export function useEstablishmentTable({
  onEdit,
}: {
  onEdit: (id: string) => void
}) {
  const queryClient = useQueryClient()
  const sorting = ref<SortingState>([])

  const handleMutationError = (error: FetchError | unknown) => {
    if (typeof error === 'object' && error !== null && 'data' in error) {
      const fetchError = error as FetchError
      if (fetchError.response?.status === 409) {
        toast.error('Exclusão não permitida', {
          description:
            'Este estabelecimento possui lojas vinculadas e não pode ser excluído.',
        })
      } else {
        const message =
          (fetchError.data as any)?.message ||
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
    queryFn: () => fetchEstablishments(),
  })

  const { mutate: deleteEstablishment } = useMutation<
    { success: boolean },
    FetchError,
    string
  >({
    mutationFn: (id: string) => deleteEstablishmentAction(id),
    onSuccess: () => {
      toast.success('Estabelecimento excluído com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['establishments'] })
    },
    onError: handleMutationError,
  })

  const onGoToStores = (id: string) => console.log(`toStores: ${id}`)
  const onDelete = (id: string) => deleteEstablishment(id)

  const columns = getEstablishmentColumns({ onEdit, onGoToStores, onDelete })

  const tableData = computed(() => data.value ?? [])

  const table = useVueTable({
    data: tableData,
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

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

import { getStoreColumns } from './storeColumns'
import { deleteStoreAction, fetchStores } from '~/src/actions/store.actions'

export function useStoreTable({
  establishmentId,
  onEdit,
}: {
  establishmentId: MaybeRef<string>
  onEdit: (id: string) => void
}) {
  const queryClient = useQueryClient()
  const sorting = ref<SortingState>([])

  const isConfirmDialogOpen = ref(false)
  const storeToDeleteId = ref<string | null>(null)

  const id = computed(() => unref(establishmentId))

  const { data, isLoading, isError } = useQuery({
    queryKey: ['stores', id],
    queryFn: () => fetchStores(id.value),
    enabled: computed(() => !!id.value),
  })

  const { mutate: deleteStore, isPending: isDeletePending } = useMutation<
    { success: boolean },
    FetchError,
    string
  >({
    mutationFn: (storeId: string) => deleteStoreAction(storeId, id.value),
    onSuccess: () => {
      toast.success('Loja excluída com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['stores', id.value] })
      queryClient.invalidateQueries({ queryKey: ['establishments'] })
      isConfirmDialogOpen.value = false
    },
    onError: (error) => {
      const message = (error.data as any)?.message || 'Falha ao excluir a loja.'
      toast.error('Erro na Exclusão', { description: message })
    },
  })

  const onDelete = (storeId: string) => {
    storeToDeleteId.value = storeId
    isConfirmDialogOpen.value = true
  }

  const handleConfirmDelete = () => {
    if (storeToDeleteId.value) {
      deleteStore(storeToDeleteId.value)
    }
  }

  const columns = getStoreColumns({ onEdit, onDelete })

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
    isConfirmDialogOpen,
    isDeletePending,
    handleConfirmDelete,
  }
}

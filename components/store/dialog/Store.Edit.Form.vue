<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { watch } from 'vue'
import { toast } from 'vue-sonner'
import type { FetchError } from 'ofetch'

import {
  updateStoreSchema,
  type UpdateStoreSchema,
} from '~/src/schemas/store.schema'
import { fetchStoreById, updateStoreAction } from '~/src/actions/store.actions'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  storeId: string
  establishmentId: string
  onSuccess?: () => void
}>()

const queryClient = useQueryClient()

const { data: storeData, isLoading: isLoadingData } = useQuery({
  queryKey: ['store', props.storeId],
  queryFn: () => fetchStoreById(props.establishmentId, props.storeId),
  enabled: !!props.storeId,
})

const { handleSubmit, defineField, errors, setValues } = useForm({
  validationSchema: toTypedSchema(updateStoreSchema),
})

watch(storeData, (newData) => {
  if (newData) {
    setValues({
      name: newData.name,
      store_name: newData.storeName,
      number: newData.number,
    })
  }
})

const [name, nameAttrs] = defineField('name')
const [storeName, storeNameAttrs] = defineField('store_name')
const [number, numberAttrs] = defineField('number')

const { mutate, isPending } = useMutation<
  any,
  FetchError<{ message: string }>,
  UpdateStoreSchema
>({
  mutationFn: (formData) =>
    updateStoreAction({
      establishmentId: props.establishmentId,
      storeId: props.storeId,
      data: formData,
    }),

  onSuccess: () => {
    toast.success('Sucesso!', {
      description: 'Loja atualizada com sucesso!',
    })
    queryClient.invalidateQueries({
      queryKey: ['stores', props.establishmentId],
    })
    queryClient.invalidateQueries({
      queryKey: ['store', props.storeId],
    })
    if (props.onSuccess) {
      props.onSuccess()
    }
  },
  onError: (error) => {
    const errorMessage = error.data?.message || 'Ocorreu um erro inesperado.'
    toast.error('Falha ao atualizar.', { description: errorMessage })
  },
})

const onSubmit = handleSubmit((values) => {
  mutate(values)
})
</script>

<template>
  <div v-if="isLoadingData" class="flex justify-center items-center h-40">
    Carregando dados da loja...
  </div>
  <form v-else @submit="onSubmit" class="space-y-4">
    <div class="grid gap-2">
      <Label for="edit-store-name">Nome Fantasia</Label>
      <Input id="edit-store-name" v-model="name" v-bind="nameAttrs" />
      <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</p>
    </div>

    <div class="grid gap-2">
      <Label for="edit-store-store_name">Nome da Loja (Razão Social)</Label>
      <Input
        id="edit-store-store_name"
        v-model="storeName"
        v-bind="storeNameAttrs"
      />
      <p v-if="errors.store_name" class="text-sm text-red-500">
        {{ errors.store_name }}
      </p>
    </div>

    <div class="grid gap-2">
      <Label for="edit-store-number">Número (Endereço)</Label>
      <Input id="edit-store-number" v-model="number" v-bind="numberAttrs" />
      <p v-if="errors.number" class="text-sm text-red-500">
        {{ errors.number }}
      </p>
    </div>

    <div class="flex w-full pt-4">
      <Button type="submit" :disabled="isPending" size="lg" class="flex-1">
        <span v-if="isPending">Salvando...</span>
        <span v-else>Salvar Alterações</span>
      </Button>
    </div>
  </form>
</template>

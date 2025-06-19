<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { watch } from 'vue'
import { toast } from 'vue-sonner'
import type { FetchError } from 'ofetch'

import {
  updateEstablishmentSchema,
  type UpdateEstablishmentSchema,
} from '@/src/schemas/establishment.schema'
import {
  fetchEstablishmentById,
  updateEstablishmentAction,
} from '@/src/actions/establishment.actions'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  establishmentId: string
  onSuccess?: () => void
}>()

const queryClient = useQueryClient()

const { data: establishmentData, isLoading: isLoadingData } = useQuery({
  queryKey: ['establishment', props.establishmentId],
  queryFn: () => fetchEstablishmentById(props.establishmentId),
})

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(updateEstablishmentSchema),
})

watch(establishmentData, (newData) => {
  if (newData) {
    resetForm({
      values: {
        name: newData.name,
        corporate_name: newData.corporateName,
        number: newData.number,
      },
    })
  }
})

const [name, nameAttrs] = defineField('name')
const [corporateName, corporateNameAttrs] = defineField('corporate_name')
const [number, numberAttrs] = defineField('number')

const { mutate, isPending } = useMutation<
  any,
  FetchError<{ message: string }>,
  UpdateEstablishmentSchema
>({
  mutationFn: (formData) =>
    updateEstablishmentAction({ id: props.establishmentId, data: formData }),

  onSuccess: () => {
    toast.success('Sucesso!', {
      description: 'Estabelecimento atualizado com sucesso!',
    })
    queryClient.invalidateQueries({ queryKey: ['establishments'] })
    queryClient.invalidateQueries({
      queryKey: ['establishment', props.establishmentId],
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
  <div v-if="isLoadingData">Carregando dados...</div>
  <form v-else @submit="onSubmit" class="space-y-4">
    <div class="grid gap-2">
      <Label for="edit-name">Nome Fantasia</Label>
      <Input id="edit-name" v-model="name" v-bind="nameAttrs" />
      <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</p>
    </div>

    <div class="grid gap-2">
      <Label for="edit-corporate_name">Razão Social</Label>
      <Input
        id="edit-corporate_name"
        v-model="corporateName"
        v-bind="corporateNameAttrs"
      />
      <p v-if="errors.corporate_name" class="text-sm text-red-500">
        {{ errors.corporate_name }}
      </p>
    </div>

    <div class="grid gap-2">
      <Label for="edit-number">Número</Label>
      <Input
        id="edit-number"
        v-model="number"
        v-bind="numberAttrs"
        v-mask="'####################'"
      />
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

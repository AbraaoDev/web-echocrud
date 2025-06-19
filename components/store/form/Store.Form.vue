<script setup lang="ts">
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { FetchError } from 'ofetch'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import { storeSchema, type StoreSchema } from '~/src/schemas/store.schema'
import { createStoreAction } from '~/src/actions/store.actions'

const props = defineProps<{
  establishmentId: string
  onSuccess?: () => void
}>()

const queryClient = useQueryClient()

const { handleSubmit, defineField, errors, resetForm, setFieldError } = useForm(
  {
    validationSchema: toTypedSchema(storeSchema),
  }
)

const [name, nameAttrs] = defineField('name')
const [storeName, storeNameAttrs] = defineField('store_name')
const [storeNumber, storeNumberAttrs] = defineField('store_number')
const [address, addressAttrs] = defineField('address')
const [number, numberAttrs] = defineField('number')
const [city, cityAttrs] = defineField('city')
const [state, stateAttrs] = defineField('state')
const [zipCode, zipCodeAttrs] = defineField('zip_code')

const { mutate, isPending } = useMutation<
  any,
  FetchError<{ message: string }>,
  StoreSchema
>({
  mutationFn: (storeData) =>
    createStoreAction(props.establishmentId, storeData),
  onSuccess: () => {
    toast.success('Loja criada com sucesso!', {
      description: 'A nova loja já está disponível para visualização.',
    })
    queryClient.invalidateQueries({
      queryKey: ['stores', props.establishmentId],
    })
    queryClient.invalidateQueries({ queryKey: ['establishments'] })
    resetForm()
    if (props.onSuccess) {
      props.onSuccess()
    }
  },
  onError: (error) => {
    if (error.statusCode === 409) {
      const errorMessage = error.data?.message || 'Este CNPJ já está em uso.'
      setFieldError('store_number', errorMessage)
      toast.error('Verifique o campo CNPJ.')
    } else {
      const errorMessage = error.data?.message || 'Ocorreu um erro inesperado.'
      toast.error('Falha ao criar loja.', {
        description: errorMessage,
      })
    }
  },
})

const onSubmit = handleSubmit((values) => {
  mutate(values)
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4 px-4">
    <div class="grid gap-2">
      <Label for="name">Nome Fantasia</Label>
      <Input
        id="name"
        v-model="name"
        v-bind="nameAttrs"
        placeholder="Varejo Center"
      />
      <p v-if="errors.name" class="text-sm text-red-500">
        {{ errors.name }}
      </p>
    </div>

    <div class="grid gap-2">
      <Label for="store_name">Nome Corporativo</Label>
      <Input
        id="store_name"
        v-model="storeName"
        v-bind="storeNameAttrs"
        placeholder="Comércio Varejista Center Ltda"
      />
      <p v-if="errors.store_name" class="text-sm text-red-500">
        {{ errors.store_name }}
      </p>
    </div>

    <div class="grid gap-2">
      <Label for="store_number">CNPJ</Label>
      <Input
        id="store_number"
        v-model="storeNumber"
        v-bind="storeNumberAttrs"
        placeholder="98.765.432/0001-10"
        v-mask="'##.###.###/####-##'"
      />
      <p v-if="errors.store_number" class="text-sm text-red-500">
        {{ errors.store_number }}
      </p>
    </div>

    <div class="grid gap-2">
      <Label for="address">Endereço</Label>
      <Input
        id="address"
        v-model="address"
        v-bind="addressAttrs"
        placeholder="Avenida Principal"
      />
      <p v-if="errors.address" class="text-sm text-red-500">
        {{ errors.address }}
      </p>
    </div>
    <div class="grid gap-2">
      <Label for="number">Número</Label>
      <Input
        id="number"
        v-model="number"
        v-bind="numberAttrs"
        placeholder="456"
      />
      <p v-if="errors.number" class="text-sm text-red-500">
        {{ errors.number }}
      </p>
    </div>

    <div class="grid gap-2">
      <Label for="city">Cidade</Label>
      <Input
        id="city"
        v-model="city"
        v-bind="cityAttrs"
        placeholder="Campinas"
      />
      <p v-if="errors.city" class="text-sm text-red-500">{{ errors.city }}</p>
    </div>
    <div class="grid gap-2">
      <Label for="state">Estado (UF)</Label>
      <Input
        id="state"
        v-model="state"
        v-bind="stateAttrs"
        placeholder="SP"
        v-mask="'AA'"
      />
      <p v-if="errors.state" class="text-sm text-red-500">
        {{ errors.state }}
      </p>
    </div>
    <div class="grid gap-2">
      <Label for="zip_code">CEP</Label>
      <Input
        id="zip_code"
        v-model="zipCode"
        v-bind="zipCodeAttrs"
        placeholder="13001-001"
        v-mask="'#####-###'"
      />
      <p v-if="errors.zip_code" class="text-sm text-red-500">
        {{ errors.zip_code }}
      </p>
    </div>

    <div class="flex justify-end pt-4">
      <Button type="submit" :disabled="isPending">
        <span v-if="isPending">Salvando Loja...</span>
        <span v-else>Salvar Loja</span>
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

import {
  establishmentSchema,
  type EstablishmentSchema,
} from '@/src/schemas/establishment.schema'
import { createEstablishmentAction } from '@/src/actions/establishment.actions'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import type { FetchError } from 'ofetch'

const props = defineProps<{
  onSuccess?: () => void
}>()

const queryClient = useQueryClient()

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: toTypedSchema(establishmentSchema),
})

const [name, nameAttrs] = defineField('name')
const [corporateName, corporateNameAttrs] = defineField('corporate_name')
const [corporateNumber, corporateNumberAttrs] = defineField('corporate_number')
const [address, addressAttrs] = defineField('address')
const [number, numberAttrs] = defineField('number')
const [city, cityAttrs] = defineField('city')
const [state, stateAttrs] = defineField('state')
const [zipCode, zipCodeAttrs] = defineField('zip_code')

const {
  mutate,
  isPending,
  error: mutationError,
  data: mutationResult,
} = useMutation<any, FetchError<{ message: string }>, EstablishmentSchema>({
  mutationFn: createEstablishmentAction,
  onSuccess: (result) => {
    toast.success('Sucesso!.', {
      description: 'Estabelecimento criado com sucesso!',
    })
    queryClient.invalidateQueries({ queryKey: ['establishments'] })
    resetForm()
    if (props.onSuccess) {
      props.onSuccess()
    }
  },
  onError: (error) => {
    const errorMessage = error.data?.message || 'Ocorreu um erro inesperado.'

    toast.error('Falha ao criar.', {
      description: errorMessage,
    })
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
        placeholder="Tech Solutions Ltda"
      />
      <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</p>
    </div>

    <div class="grid gap-2">
      <Label for="corporate_name">Razão Social</Label>
      <Input
        id="corporate_name"
        v-model="corporateName"
        v-bind="corporateNameAttrs"
        placeholder="Tech Solutions Desenvolvimento de Software Ltda"
      />
      <p v-if="errors.corporate_name" class="text-sm text-red-500">
        {{ errors.corporate_name }}
      </p>
    </div>

    <div class="grid gap-2">
      <Label for="corporate_number">CNPJ</Label>
      <Input
        id="corporate_number"
        v-model="corporateNumber"
        v-bind="corporateNumberAttrs"
        placeholder="12.345.678/0001-90"
        v-mask="'##.###.###/####-##'"
      />
      <p v-if="errors.corporate_number" class="text-sm text-red-500">
        {{ errors.corporate_number }}
      </p>
    </div>
    <div class="grid gap-2">
      <Label for="address">Endereço</Label>
      <Input
        id="address"
        v-model="address"
        v-bind="addressAttrs"
        placeholder="Rua das Tecnologias"
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
        placeholder="123"
        v-mask="'####################'"
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
        placeholder="São Paulo"
      />
      <p v-if="errors.city" class="text-sm text-red-500">{{ errors.city }}</p>
    </div>
    <div class="grid gap-2">
      <Label for="state">Estado</Label>
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
        placeholder="01234-567"
        v-mask="'#####-###'"
      />
      <p v-if="errors.zip_code" class="text-sm text-red-500">
        {{ errors.zip_code }}
      </p>
    </div>

    <div
      v-if="mutationResult && !mutationResult.success"
      class="mt-2 text-center text-sm text-red-500"
    >
      <p>{{ mutationResult.message }}</p>
    </div>
    <div v-if="mutationError" class="mt-2 text-center text-sm text-red-500">
      <p>Ocorreu um erro inesperado. Tente novamente.</p>
    </div>

    <div class="flex justify-end pt-4">
      <Button type="submit" :disabled="isPending">
        <span v-if="isPending">Salvando...</span>
        <span v-else>Salvar</span>
      </Button>
    </div>
  </form>
</template>

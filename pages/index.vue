<script setup lang="ts">
useHead({
  title: 'EchoCRUD',
})
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useMutation } from '@tanstack/vue-query'
import { navigateTo } from '#app'

import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '@/components/ui/button'

import { loginSchema, type LoginSchema } from '@/src/schemas/auth.schema'
import { loginAction } from '~/src/actions/auth.actions'

definePageMeta({
  layout: false,
})

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const {
  mutate,
  isPending,
  error: mutationError,
  data: mutationResult,
} = useMutation({
  mutationFn: loginAction,
  onSuccess: (result) => {
    if (result.success) {
      navigateTo('/app', { replace: true })
    }
  },
})

const onSubmit = handleSubmit((values) => {
  mutate(values)
})
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <div class="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1fr]">
      <section
        class="flex flex-col justify-center py-10 px-6 sm:px-12 lg:px-20 gap-16"
      >
        <NuxtImg
          src="/logo.svg"
          alt="Logomarca do EchoCRUD"
          class="w-52 h-16"
        />
        <div class="flex flex-col gap-10">
          <div class="flex flex-col gap-2">
            <h1 class="font-bold text-4xl text-primary">Acesse a plataforma</h1>
            <p class="text-muted-foreground text-base">
              Faça login e comece a gestão de seus Estabelecimentos ainda hoje.
            </p>
          </div>
          <form @submit="onSubmit">
            <div class="gap-4 flex flex-col">
              <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seumelhor@email.com"
                  v-model="email"
                  v-bind="emailAttrs"
                />
                <p v-if="errors.email" class="text-sm text-red-500">
                  {{ errors.email }}
                </p>
              </div>
              <div class="grid gap-2">
                <Label for="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha aqui"
                  v-model="password"
                  v-bind="passwordAttrs"
                />
                <p v-if="errors.password" class="text-sm text-red-500">
                  {{ errors.password }}
                </p>
              </div>

              <div
                v-if="mutationResult && !mutationResult.success"
                class="mt-2 text-center text-sm text-red-500"
              >
                <p>{{ mutationResult.message }}</p>
              </div>
              <div
                v-if="mutationError"
                class="mt-2 text-center text-sm text-red-500"
              >
                <p>Ocorreu um erro inesperado. Tente novamente.</p>
              </div>

              <Button
                size="lg"
                type="submit"
                class="cursor-pointer mt-4"
                :disabled="isPending"
              >
                <span v-if="isPending">Entrando...</span>
                <span v-else>Entrar</span>
              </Button>

              <footer class="mt-10">
                <p class="text-center text-muted-foreground">
                  Made by Abraão Moreira © 2025
                </p>
              </footer>
            </div>
          </form>
        </div>
      </section>
      <aside class="hidden lg:block">
        <NuxtImg
          src="/hero-login.svg"
          alt="Gestão de Estabelecimentos e Lojas"
          class="w-full h-full"
        />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navLinks = [
  { name: 'Início', href: '/app' },
  // { name: 'Lojas', href: '/app/stores' },
]

const user = {
  name: 'Abraão Moreira',
  role: 'Administrador',
  initials: 'AM',
  avatarUrl: 'https://github.com/abraaodev.png',
}
</script>

<template>
  <header
    class="flex h-16 items-center justify-between border-b bg-background px-6"
  >
    <div class="flex items-center gap-28">
      <NuxtLink to="/app">
        <NuxtImg src="/logo.svg" alt="Logomarca EchoCRUD" class="h-8 w-auto" />
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-2">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.name"
          :to="link.href"
          custom
          v-slot="{ navigate, isActive }"
        >
          <Button
            :variant="isActive ? 'secondary' : 'ghost'"
            @click="navigate"
            class="cursor-pointer"
          >
            {{ link.name }}
          </Button>
        </NuxtLink>
      </nav>
    </div>

    <div class="flex items-center gap-4">
      <Avatar>
        <AvatarImage :src="user.avatarUrl" :alt="user.name" />
        <AvatarFallback>{{ user.initials }}</AvatarFallback>
      </Avatar>
      <div class="flex flex-col items-end">
        <span class="text-sm font-medium">{{ user.name }}</span>
        <span class="text-xs text-muted-foreground">{{ user.role }}</span>
      </div>
    </div>
  </header>
</template>

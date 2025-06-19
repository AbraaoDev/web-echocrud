<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Store } from '~/src/types/store.interfaces'

const props = defineProps<{
  store: Store
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}>()

const handleEdit = () => {
  props.onEdit(props.store.id)
}

const handleDelete = () => {
  props.onDelete(props.store.id)
}
</script>

<template>
  <div class="relative text-right">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="h-8 w-8 p-0">
          <span class="sr-only">Abrir menu</span>
          <MoreHorizontal class="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel
          class="text-[10px] text-muted-foreground tracking-wider"
        >
          AÇÕES
        </DropdownMenuLabel>
        <DropdownMenuItem @click="handleEdit"> Editar </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="text-red-600" @click="handleDelete">
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

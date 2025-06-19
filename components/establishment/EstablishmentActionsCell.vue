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
import type { Establishment } from '~/src/types/establishment.interfaces'

const props = defineProps<{
  establishment: Establishment
  onEdit: (id: string) => void
  onGoToStores: (id: string) => void
  onDelete: (id: string) => void
}>()

const handleEdit = () => {
  props.onEdit(props.establishment.id)
}

const handleGoToStores = () => {
  props.onGoToStores(props.establishment.id)
}

const handleDelete = () => {
  props.onDelete(props.establishment.id)
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
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem @click="handleGoToStores">
          Ver Lojas
        </DropdownMenuItem>
        <DropdownMenuItem @click="handleEdit"> Editar </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="text-red-600" @click="handleDelete">
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

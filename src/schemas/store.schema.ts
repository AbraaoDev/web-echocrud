import { z } from 'zod'

export const storeSchema = z.object({
  name: z.string().min(3, 'O nome fantasia deve ter no mínimo 3 caracteres.'),
  store_name: z
    .string()
    .min(3, 'A razão social deve ter no mínimo 3 caracteres.'),
  store_number: z
    .string()
    .length(18, 'O CNPJ deve ter 18 caracteres (formato: XX.XXX.XXX/XXXX-XX).'),
  address: z.string().min(5, 'O endereço deve ter no mínimo 5 caracteres.'),
  number: z.string().min(1, 'O número é obrigatório.'),
  city: z.string().min(3, 'A cidade deve ter no mínimo 3 caracteres.'),
  state: z.string().length(2, 'O estado deve ter 2 caracteres (ex: SP).'),
  zip_code: z
    .string()
    .length(9, 'O CEP deve ter 9 caracteres (formato: XXXXX-XXX).'),
})

export type StoreSchema = z.infer<typeof storeSchema>

export const updateStoreSchema = z.object({
  name: z.string().min(3, 'O nome fantasia deve ter no mínimo 3 caracteres.'),
  store_name: z
    .string()
    .min(3, 'O nome da loja deve ter no mínimo 3 caracteres.'),
  number: z.string().min(1, 'O número é obrigatório.'),
})

export type UpdateStoreSchema = z.infer<typeof updateStoreSchema>

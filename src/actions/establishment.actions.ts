import type { Establishment } from '../types/establishment.interfaces'
import type {
  EstablishmentSchema,
  UpdateEstablishmentSchema,
} from '../schemas/establishment.schema'

type ApiEstablishmentResponse = {
  ID: number
  name: string
  corporate_name: string
  corporate_number: string
  address: string
  city: string
  state: string
  zip_code: string
  number: string
  stores: any[]
}

// mapper necessário de snake para camel
function mapApiToEstablishment(
  apiData: ApiEstablishmentResponse
): Establishment {
  return {
    id: String(apiData.ID),
    name: apiData.name,
    corporateName: apiData.corporate_name,
    corporateNumber: apiData.corporate_number,
    address: apiData.address,
    city: apiData.city,
    state: apiData.state,
    zipCode: apiData.zip_code,
    number: apiData.number,
    storeCount: apiData.stores?.length ?? 0,
  }
}

export async function fetchEstablishments(): Promise<Establishment[]> {
  const config = useRuntimeConfig()
  const response = await $fetch<ApiEstablishmentResponse[]>('/establishments', {
    baseURL: config.public.apiBase,
  })
  return response.map(mapApiToEstablishment)
}

export async function createEstablishmentAction(data: EstablishmentSchema) {
  const config = useRuntimeConfig()
  return await $fetch('/establishments', {
    method: 'POST',
    baseURL: config.public.apiBase,
    body: data,
  })
}

export async function fetchEstablishmentById(
  id: string
): Promise<Establishment> {
  const config = useRuntimeConfig()
  const apiData = await $fetch<ApiEstablishmentResponse>(
    `/establishments/${id}`,
    {
      baseURL: config.public.apiBase,
    }
  )
  return mapApiToEstablishment(apiData)
}

export async function updateEstablishmentAction({
  id,
  data,
}: {
  id: string
  data: UpdateEstablishmentSchema
}) {
  const config = useRuntimeConfig()

  return await $fetch(`/establishments/${id}`, {
    method: 'PUT',
    baseURL: config.public.apiBase,
    body: data,
  })
}

export async function deleteEstablishmentAction(
  id: string
): Promise<{ success: boolean }> {
  const config = useRuntimeConfig()
  await $fetch(`/establishments/${id}`, {
    method: 'DELETE',
    baseURL: config.public.apiBase,
  })
  return { success: true }
}

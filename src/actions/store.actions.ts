import type { StoreSchema, UpdateStoreSchema } from '../schemas/store.schema'
import type { Store } from '../types/store.interfaces'

type ApiStoreResponse = {
  ID: number
  name: string
  store_name: string
  store_number: string
  address: string
  city: string
  state: string
  zip_code: string
  number: string
  establishment_id: string
}

// mapper necessário de snake para camel
function mapApiToStore(apiData: ApiStoreResponse): Store {
  return {
    id: String(apiData.ID),
    name: apiData.name,
    storeName: apiData.store_name,
    storeNumber: apiData.store_number,
    address: apiData.address,
    city: apiData.city,
    state: apiData.state,
    zipCode: apiData.zip_code,
    number: apiData.number,
    establishmentId: apiData.establishment_id,
  }
}

export async function fetchStores(id: string): Promise<Store[]> {
  const config = useRuntimeConfig()
  const apiData = await $fetch<ApiStoreResponse[]>(
    `/establishments/${id}/stores`,
    {
      baseURL: config.public.apiBase,
    }
  )
  return apiData.map(mapApiToStore)
}

export async function fetchStoreById(
  establishmentId: string,
  storeId: string
): Promise<Store> {
  const config = useRuntimeConfig()
  const apiData = await $fetch<ApiStoreResponse>(
    `/establishments/${establishmentId}/stores/${storeId}`,
    {
      baseURL: config.public.apiBase,
    }
  )
  return mapApiToStore(apiData)
}

export async function createStoreAction(
  establishmentId: string,
  data: StoreSchema
) {
  const config = useRuntimeConfig()
  return await $fetch(`/establishments/${establishmentId}/stores`, {
    method: 'POST',
    baseURL: config.public.apiBase,
    body: data,
  })
}

export async function updateStoreAction({
  establishmentId,
  storeId,
  data,
}: {
  establishmentId: string
  storeId: string
  data: UpdateStoreSchema
}) {
  const config = useRuntimeConfig()

  return await $fetch(`/establishments/${establishmentId}/stores/${storeId}`, {
    method: 'PUT',
    baseURL: config.public.apiBase,
    body: data,
  })
}

export async function deleteStoreAction(
  id: string,
  establishmentId: string
): Promise<{ success: boolean }> {
  const config = useRuntimeConfig()
  await $fetch(`/establishments/${establishmentId}/stores/${id}`, {
    method: 'DELETE',
    baseURL: config.public.apiBase,
  })
  return { success: true }
}

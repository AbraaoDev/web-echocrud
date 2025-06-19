import type { AxiosInstance } from 'axios'
import type { Establishment } from '../types/establishment.interfaces'

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

export async function fetchEstablishments(
  apiClient: AxiosInstance
): Promise<Establishment[]> {
  const response =
    await apiClient.get<ApiEstablishmentResponse[]>('/establishments')
  return response.data.map(mapApiToEstablishment)
}

export async function deleteEstablishmentAction(
  id: string,
  apiClient: AxiosInstance
): Promise<{ success: boolean }> {
  await apiClient.delete(`/establishments/${id}`)
  return { success: true }
}

import { AxiosApiAdapter } from "@/adapters/AxiosApiAdapter"
import type { IApiAdapter } from "@/adapters/IApiAdapter"
import { pokemonApi } from "@/apis/pokemonApi"

type AdapterType = 'axios' | 'fetch'

export function buildApiAdapter(type: AdapterType): IApiAdapter {
  switch (type) {
    case 'axios':
      return new AxiosApiAdapter(pokemonApi)


    default:
      throw new Error(`Adapter type "${type}" is not supported.`)
  }
}

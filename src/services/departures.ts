import { API_BASE_URL } from '@/constants'
import { Departure } from '@/types'
import { GetDeparturesResponse } from '@/types/api'

export const getDepartures = async (): Promise<Departure[]> => {
  const response = await fetch(`${API_BASE_URL}/departures/Flightdata`)
  const departures: GetDeparturesResponse = await response.json()
  return departures.allDepartures
}

import { DepartureStatusCode } from '@/types'

export const getStatus = (statusText: string): DepartureStatusCode => {
  if (statusText.includes('Boarding')) return DepartureStatusCode.BOARDING
  if (statusText.includes('Cancelled')) return DepartureStatusCode.CANCELLED
  if (statusText.includes('Delayed')) return DepartureStatusCode.DELAYED
  if (statusText.includes('Departed')) return DepartureStatusCode.DEPARTED
  if (statusText.includes('Final Call')) return DepartureStatusCode.GATE_CLOSING
  if (statusText.includes('Go to Gate')) return DepartureStatusCode.GATE_OPEN

  return DepartureStatusCode.GATE_CLOSED
}

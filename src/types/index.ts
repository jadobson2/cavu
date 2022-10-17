export interface ArrivalAirport {
  name: string;
  cityName: string;
  countryName: string;
  code: string;
}

export interface DepartureAirport {
  name: string;
  cityName: string;
  countryName: string;
  code: string;
}

export interface Airline {
  name: string;
  code: string;
}

export interface DepartureGate {
  name: string;
  number: string;
  action: string;
}

export interface Departure {
  flightDirection: string;
  scheduledDepartureDateTime: string;
  scheduledArrivalDateTime: string;
  estimatedDepartureDateTime: string;
  actualDepartureDateTime: string;
  arrivalAirport: ArrivalAirport;
  departureAirport: DepartureAirport;
  flightNumber: string;
  airline: Airline;
  departureGate: DepartureGate | null;
  arrivalTerminal: string | null;
  departureTerminal: string;
  status: string;
}

export enum DepartureStatusCode {
  BOARDING = 'BOARDING',
  CANCELLED = 'CANCELLED',
  DELAYED = 'DELAYED',
  DEPARTED = 'DEPARTED',
  GATE_CLOSED = 'GATE_CLOSED',
  GATE_CLOSING = 'GATE_CLOSING',
  GATE_OPEN = 'GATE_OPEN'
}

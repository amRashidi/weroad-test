export type BookingPassengerItem = {
  name: string;
  email: string;
  number: string;
  age : string;
  gender: string;
}

export type BookingDataItem = {
  id: string;
  travel: string;
  payment: string;
  status: string;
  note: string;
}

export type BookingItem = BookingPassengerItem & BookingDataItem;

export type BookingResult = BookingDataItem & {
  route: string;
  departureDate: string;
  returnDate: string;
  price: number
  passenger: BookingPassengerItem
}

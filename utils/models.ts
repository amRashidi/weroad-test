const DefaultTravelFilter = {
  availablity: {
    min: '',
    max: ''
  },
  tags: [],
  destinations: [],
  duration: {
    min: Infinity,
    max: -1
  }
}

const TravelFilterModel = {
  from: '',
  to: '',
  tags: [],
  destinations: [],
  duration: 0
}

const TravelFormModel = {
  name: '',
  origin: '',
  destination: '',
  departureDate: '',
  returnDate: '',
  picture: '',
  price: 0,
  tags: ''
}

const BookingFormModel = {
  id: '',
  travel: '',
  name: '',
  age: '',
  email: '',
  number: '',
  gender: '',
  payment: '',
  note: ''
}

export {
  TravelFilterModel,
  BookingFormModel,
  TravelFormModel,
  DefaultTravelFilter
}

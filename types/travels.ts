export type TravelResult = {
  id: string;
  picture: string;
  name: string;
  tags: string[];
  name: string;
  origin: string;
  destination: string;
  price: number;
  departureDate: string;
  returnDate: string;
  reviews: number
}

export type TravelItem = TravelResult & {
  tags: {
    label: string;
    value: string
  }[]
  destination: {
    label: string;
    value: string
  }[]
  duration: number
}

export type TravelDurationFilter = {
  from: string
  to: string
}

export type TravelFilters = TravelDurationFilter & {
  availablity: TravelDurationFilter;
  tags: string[];
  destination: string[]
  duration: string
}

export type TravelFilterOptions = {
  availablity: {
    min: string,
    max: string
  },
  tags: string[],
  destinations: string[],
  duration: {
    min: number,
    max: number
  }
}

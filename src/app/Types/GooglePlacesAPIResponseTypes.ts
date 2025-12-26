export type AutocompleteResponse = {
    suggestions: Suggestion[]
}

export type Suggestion = {
    placePrediction: PlacePrediction
}

export type PlacePrediction = {
    placeId: string
}

export type PlaceDetailsResponse = {
    addressComponents: AddressComponent[]
}

export type AddressComponent = {
    longText: string;
    shortText: string;
    types: string[]
}


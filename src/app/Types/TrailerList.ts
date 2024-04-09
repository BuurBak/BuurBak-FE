import { TrailerType } from './TrailerType'
import { User } from './User'

export interface TrailerList {
  id: string
  trailerType: TrailerType
  owner: User
  length: number
  height: number
  width: number
  licensePlateNumber: string
  pickUpTimeStart: string
  pickUpTimeEnd: string
  dropOffTimeStart: string
  dropOffTimeEnd: string
  fakeLatitude: number
  fakeLongitude: number
  description: string
  price: number
  available: boolean
  cityAddress: { city: string }
  name: string
  createdAt: Date
  updatedAt: Date
  rating: number
  coverImage: string
  trailerImages: string[]
  trailerWeekScheduleTemplate: any
  driversLicenseType: string
  nearbyLatitude: any
  nearbyLongitude: any
}

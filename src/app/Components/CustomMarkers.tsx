import { useState } from 'react'
import './Map.css'

interface CustomMarkerProps {
  trailer: any
  setCenterCoordinates: (coordinates: { lat: number; lng: number }) => void
  activeTrailer?: any
  setActiveTrailer?: React.Dispatch<React.SetStateAction<any>>
  mapRef?: React.RefObject<google.maps.Map>
}

export default function CustomMarker({
  trailer,
  setCenterCoordinates,
  activeTrailer,
  setActiveTrailer,
  mapRef,
}: CustomMarkerProps) {
  const [isActive, setIsActive] = useState(true)

  return (
    <div
      style={
        activeTrailer?.id === trailer.id
          ? { position: 'absolute', zIndex: 99 }
          : { position: 'absolute', zIndex: 1 }
      }
    >
      <div
        className="customMarkerContainer"
        onClick={() => {
          if (mapRef!.current) {
            mapRef!.current.panTo({
              lat: Number(trailer.nearbyLatitude),
              lng: Number(trailer.nearbyLongitude),
            })
          }
          setCenterCoordinates({
            lat: Number(trailer.nearbyLatitude),
            lng: Number(trailer.nearbyLongitude),
          })
          setIsActive(true)
        }}
      >
        <p>€{trailer.price ? trailer.price.toFixed(0) : '15'}</p>
      </div>
      {Object.keys(activeTrailer).length > 0 &&
      activeTrailer.id === trailer.id &&
      isActive ? (
        <div className="activeTrailerMapContainer">
          <img alt="trailer" src={activeTrailer.coverImage} />
          <div className="activeTrailerInfo">
            <p>{activeTrailer.trailerType.name}</p>
            <p>
              €{activeTrailer.price ? activeTrailer.price : '15,00'} per dag
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

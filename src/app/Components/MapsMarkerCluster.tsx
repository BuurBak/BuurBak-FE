import {
    MarkerClusterer,
    SuperClusterAlgorithm,
} from '@googlemaps/markerclusterer';

import { addSingleMarkers } from './MapsMarker';


export const addClusterMarkers = ({
    locations,
    map,
    price,
}: {
    locations: ReadonlyArray<google.maps.LatLngLiteral>;
    map: google.maps.Map | null | undefined;
    price: Array<number>;
}) => {

    const markers = addSingleMarkers({ locations, map });

    // Merge markers into clusters
    new MarkerClusterer({
        markers,
        map,
        algorithm: new SuperClusterAlgorithm({
            radius: 350, // cluster size
        }),
    });
};
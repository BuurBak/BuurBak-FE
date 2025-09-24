import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { Input } from "@heroui/input";

export type LocationData = {
    longName: string,
    types: string[];
};

type SearchPlaceProps = {
    onLocationChange: (data: LocationData[]) => void;
};


const SearchPlaceProvider = ({ onLocationChange }: SearchPlaceProps) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    return (
        apiKey ? (
            <APIProvider apiKey={apiKey} >
                <SearchPlaceInput onLocationChange={(data) => onLocationChange(data)}></SearchPlaceInput>
            </APIProvider >
        ) : (
            <span>API KEY NOT FOUND</span>
        )
    );
};

const SearchPlaceInput = ({ onLocationChange }: SearchPlaceProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] =
        useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            componentRestrictions: { country: 'nl' },
            fields: ["geometry", "address_components"],
            language: 'nl'
        };

        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener("place_changed", () => {
            const place = placeAutocomplete.getPlace();

            if (place.address_components) {
                const locationData = place.address_components.map((component) => {
                    return {
                        longName: component.long_name,
                        types: component.types
                    };
                });
                onLocationChange(locationData);
            }
        });
    }, [placeAutocomplete]);
    return <Input ref={inputRef} placeholder="Search address" />;
};

export default SearchPlaceProvider;

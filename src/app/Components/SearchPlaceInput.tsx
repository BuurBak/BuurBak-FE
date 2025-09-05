"use client";

import { Input } from "@heroui/input";
import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from '@vis.gl/react-google-maps';

type LocationData = {
  address: string;
  lat: number;
  lng: number;
};

type SearchAddressProperties = {
  onLocationChange: (location: string) => void;
};

const SearchPlaceInput = ({ onLocationChange }: SearchAddressProperties) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      console.log(placeAutocomplete.getPlace());
      const address = placeAutocomplete.getPlace().formatted_address;
      console.log(address);
      if (address) {
        onLocationChange(address);
      }
    });
  }, [placeAutocomplete]);
  return <Input ref={inputRef} placeholder="Search address" />;
};

export default SearchPlaceInput;

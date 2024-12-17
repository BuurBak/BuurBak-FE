"use client";

import { Autocomplete, TextField } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { customTheme } from "../Components/AanbodList";

type FilterOption = {
  label: string;
  options: string[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

type LocationData = {
  address: string;
  lat: number;
  lng: number;
};

type PropType = {
  onLocationChange: (location: LocationData) => void;
};

const loadGoogleMapsAPI = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window is undefined"));
      return;
    }

    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps API"));
    document.head.appendChild(script);
  });
};

const LocationInput = ({ onLocationChange }: PropType) => {
  const outerTheme = useTheme();
  const [addresses, setAddresses] = useState<string[]>([]);
  const [inputValueWhere, setInputValueWhere] = useState("");
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initGoogleMaps = async () => {
      try {
        await loadGoogleMapsAPI();
        if (isMounted) {
          setIsGoogleMapsLoaded(true);
          autocompleteServiceRef.current =
            new window.google.maps.places.AutocompleteService();
          geocoderRef.current = new window.google.maps.Geocoder();
        }
      } catch (error) {
        console.error("Error loading Google Maps API:", error);
      }
    };

    initGoogleMaps();

    return () => {
      isMounted = false;
    };
  }, []);

  const filterOptions: FilterOption[] = [
    {
      label: "Waar",
      options: addresses,
      inputValue: inputValueWhere,
      setInputValue: setInputValueWhere,
    },
  ];

  useEffect(() => {
    if (
      !isGoogleMapsLoaded ||
      !inputValueWhere ||
      !autocompleteServiceRef.current
    )
      return;

    const displaySuggestions = (
      predictions: google.maps.places.AutocompletePrediction[] | null,
      status: google.maps.places.PlacesServiceStatus
    ) => {
      if (
        status !== google.maps.places.PlacesServiceStatus.OK ||
        !predictions
      ) {
        console.error("Error fetching predictions:", status);
        return;
      }

      const addressesReturn = predictions.map(
        (prediction) => prediction.description
      );
      setAddresses(addressesReturn);
    };

    autocompleteServiceRef.current.getPlacePredictions(
      {
        input: inputValueWhere,
        componentRestrictions: { country: "nl" },
        types: ["address"],
      },
      displaySuggestions
    );
  }, [inputValueWhere, isGoogleMapsLoaded]);

  const handleAddressSelect = (address: string) => {
    if (!geocoderRef.current) return;

    geocoderRef.current.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        onLocationChange({
          address,
          lat: lat(),
          lng: lng(),
        });
      } else {
        console.error("Geocoding failed:", status);
      }
    });
  };

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      {filterOptions.map((item: FilterOption, index: number) => (
        <Autocomplete
          key={index}
          className="flex-1"
          disablePortal
          id={index.toString()}
          options={item.options || []}
          inputValue={item.inputValue}
          onInputChange={(event, newValue) => {
            item.setInputValue(newValue);
          }}
          onChange={(event, newValue) => {
            if (newValue) {
              handleAddressSelect(newValue);
            }
          }}
          renderInput={(params) => <TextField {...params} label={item.label} />}
          filterOptions={(x) => x}
        />
      ))}
    </ThemeProvider>
  );
};

export default LocationInput;

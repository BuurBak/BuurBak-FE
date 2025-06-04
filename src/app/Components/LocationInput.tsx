"use client";

import { Button, TextField, Typography } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { customTheme } from "../Components/AanbodList";

type LocationData = {
  address: string;
  lat: number;
  lng: number;
};
type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type PropType = {
  onLocationChange: (location: LocationData) => void;
};

const LocationInput = ({ onLocationChange }: PropType) => {
  const outerTheme = useTheme();
  const [postcode, setPostcode] = useState("");
  const [huisnummer, setHuisnummer] = useState("");
  const [foundAddress, setFoundAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddressFetch = async () => {
    if (!postcode || !huisnummer) {
      setErrorMessage("Postcode en huisnummer zijn verplicht.");
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);
    setFoundAddress(null);

    const address = `${huisnummer} ${postcode}, Nederland`;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY}&language=nl`
      );

      if (!response.ok) {
        setErrorMessage("Geocoding mislukt: " + response.statusText);
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.status === "OK" && data.results[0]) {
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;
        const addressComponents: AddressComponent[] = result.address_components;

        // Extract specific address components
        let street = addressComponents.find((comp) =>
          comp.types.includes("route")
        )?.long_name;
        const houseNumber = huisnummer; // Use the input house number
        const city =
          addressComponents.find((comp) => comp.types.includes("locality"))
            ?.long_name || "Onbekende stad";
        const province =
          addressComponents.find((comp) =>
            comp.types.includes("administrative_area_level_1")
          )?.long_name || "Onbekende provincie";
        const country =
          addressComponents.find((comp) => comp.types.includes("country"))
            ?.long_name || "Onbekend land";

        // If street is not found, make another request using lat/lng
        if (!street) {
          const reverseGeocodeResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY}&language=nl`
          );

          if (reverseGeocodeResponse.ok) {
            const reverseData = await reverseGeocodeResponse.json();
            if (reverseData.status === "OK" && reverseData.results[0]) {
              const reverseAddressComponents: AddressComponent[] =
                reverseData.results[0].address_components;
              street =
                reverseAddressComponents.find((comp) =>
                  comp.types.includes("route")
                )?.long_name || "Onbekende straat";
            }
          }
        }

        const formattedAddress = `${
          street || "Onbekende straat"
        } ${houseNumber}, ${city}, ${province}, ${country}`;

        // Pass the full address to the parent component
        onLocationChange({
          address: formattedAddress,
          lat,
          lng,
        });

        setFoundAddress(formattedAddress);
      } else {
        setErrorMessage("Geen adres gevonden. Controleer de invoer.");
      }
    } catch (error) {
      setErrorMessage(
        "Er is een fout opgetreden bij het ophalen van het adres."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          label="Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        <TextField
          label="Huisnummer"
          value={huisnummer}
          onChange={(e) => setHuisnummer(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddressFetch}
          disabled={isLoading}
          sx={{
            backgroundColor: "rgb(238, 123, 70)",
            "&:hover": {
              backgroundColor: "rgb(200, 100, 60)",
            },
          }}
        >
          {isLoading ? "Zoeken..." : "Zoek adres"}
        </Button>
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
        {foundAddress && (
          <Typography color="primary" variant="body1">
            Gevonden adres: {foundAddress}
          </Typography>
        )}
      </div>
    </ThemeProvider>
  );
};

export default LocationInput;

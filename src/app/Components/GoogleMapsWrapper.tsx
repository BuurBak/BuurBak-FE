import { Wrapper } from "@googlemaps/react-wrapper";
import React from "react";

export const GoogleMapsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  return (
    <Wrapper libraries={["marker", "places"]} apiKey={apiKey}>
      {children}
    </Wrapper>
  );
};

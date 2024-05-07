export const addSingleMarkers = ({
  locations,
  map,
  price,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  map: google.maps.Map | null | undefined;
  price: Array<number>;
}) => {
  locations.map((position, index) => {
    const priceTag = document.createElement("div");
    priceTag.className =
      "bg-primary-100 rounded-3xl text-white font-bold px-5 py-3";
    priceTag.textContent = "€ " + price[index].toString();

    new google.maps.marker.AdvancedMarkerElement({
      map,
      position,
      title: "A marker using a custom PNG Image",
      content: priceTag,
    });
  });
};

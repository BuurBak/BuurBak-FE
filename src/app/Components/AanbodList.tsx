import SearchOrFilter from "./SearchOrFilterFunction";

const AanbodList = () => {
  //TrailerArray is de lijst met getypte trailers objects
  const TrailerArray = SearchOrFilter();
  return (
    <div>
      <div>{/* Hier komt de zoek balk en de filter functie */}</div>
      <div>{/* Hier komt dat de .map met de card component er in */}</div>
    </div>
  );
};

export default AanbodList;

import { APIProvider } from "@vis.gl/react-google-maps";
import SearchPlaceInput from "./SearchPlaceInput";

const SearchPlaceProvider = () => {
    const apiKey = 'AIzaSyBax4h-8c6zg6iSR4ji_uZe5-ogR5EoZp0';

    return (
        <APIProvider apiKey={apiKey}>
            <SearchPlaceInput onLocationChange={() => { }}></SearchPlaceInput>
        </APIProvider>
    );
};

export default SearchPlaceProvider;

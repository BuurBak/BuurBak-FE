import { APIProvider } from "@vis.gl/react-google-maps";
import SearchPlaceInput from "./SearchPlaceInput";

const SearchPlaceProvider = ({ onLocationChange }) => {
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

export default SearchPlaceProvider;

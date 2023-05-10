import { ActionType } from "@/state/action-types";
import { StoreContext } from "@/store/store-context";
import { useContext, useState } from "react"

const useTrackLocation = () => {

    const [locationErrorMessage, setLocationErrorMessage] = useState<string>("");
    const [latlong, setLatLong] = useState<string>("");
    const [isFinding, setIsFinding] = useState<boolean>(false);
    const { dispatch } = useContext(StoreContext)

    const success = (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatLong(`${latitude},${longitude}`);
        dispatch({
            type: ActionType.SET_LAT_LON,
            payload: `${latitude},${longitude}`
        });
        setLocationErrorMessage('');
        setIsFinding(false);
    };

    const error = () => {
        setLocationErrorMessage("Unable to retrieve your location");
        setLatLong("");
        setIsFinding(false);
    };

    const handleTrackLocation = () => {
        setIsFinding(true);
        if (!navigator.geolocation) {
            setLocationErrorMessage("Geolocation is not supported by your browser");
            setIsFinding(false);
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };

    return {
        latlong,
        handleTrackLocation,
        locationErrorMessage,
        isFinding
    }

}
export default useTrackLocation;
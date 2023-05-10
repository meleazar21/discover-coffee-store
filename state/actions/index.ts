import { ICoffeeStore } from "@/interfaces";
import { ActionType } from "../action-types";

interface ISetLatLon {
    type: ActionType.SET_LAT_LON;
    payload: string;
}
interface ISetCoffeeStores {
    type: ActionType.SET_COFFEE_STORES;
    payload: Array<ICoffeeStore>;
}

export type Action = ISetLatLon | ISetCoffeeStores;
import { ICoffeeStore } from "@/interfaces";
import { Action } from "../actions";
import { ActionType } from "../action-types";

export interface ICoffeeStoresState {
    coffeeStores: Array<ICoffeeStore>;
    latlong: string
}

const initialState: ICoffeeStoresState = {
    coffeeStores: [],
    latlong: '',
};

export const coffeeStoreReducer = (state: ICoffeeStoresState, action: Action) => {
    switch (action.type) {
        case ActionType.SET_LAT_LON:
            return { ...state, latlong: action.payload }
        case ActionType.SET_COFFEE_STORES:
            return { ...state, coffeeStores: action.payload }
        default:
            return state;
    }
}

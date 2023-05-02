import { ICoffeeStore } from "@/interfaces";
import { coffeeStoreReducer } from "@/state/reducers/storeReducer";
import { createContext, useReducer } from "react";

export type initialStateType = {
    coffeeStores: Array<ICoffeeStore>;
    latlong: string;
};
export const initialState: initialStateType = {
    coffeeStores: [],
    latlong: ""
}
export const StoreContext = createContext<{ state: initialStateType, dispatch: React.Dispatch<any> }>({ state: initialState, dispatch: () => null });
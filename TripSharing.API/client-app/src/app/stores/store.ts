import TripStore from "./tripStore";
import {createContext, useContext} from "react";

interface Store {
    tripStore: TripStore
}

export const store: Store = {
    tripStore: new TripStore()
}

export const StoreContext = createContext(store);

export default function useStore() {
    return useContext(StoreContext);
}
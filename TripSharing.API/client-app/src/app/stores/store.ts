import TripStore from "./tripStore";
import {createContext, useContext} from "react";
import UserStore from "./userStore";

interface Store {
    tripStore: TripStore,
    userStore: UserStore
}

export const store: Store = {
    tripStore: new TripStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export default function useStore() {
    return useContext(StoreContext);
}
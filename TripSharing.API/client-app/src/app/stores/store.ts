import TripStore from "./tripStore";
import {createContext, useContext} from "react";
import UserStore from "./userStore";
import CommonStore from "./commonStore";

interface Store {
    tripStore: TripStore,
    commonStore: CommonStore,
    userStore: UserStore
}

export const store: Store = {
    tripStore: new TripStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export default function useStore() {
    return useContext(StoreContext);
}
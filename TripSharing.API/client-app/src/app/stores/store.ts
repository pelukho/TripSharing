import TripStore from "./tripStore";
import {createContext, useContext} from "react";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ProfileStore from "./profileStore";

interface Store {
    tripStore: TripStore,
    commonStore: CommonStore,
    userStore: UserStore,
    profileStore: ProfileStore,
}

export const store: Store = {
    tripStore: new TripStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export default function useStore() {
    return useContext(StoreContext);
}
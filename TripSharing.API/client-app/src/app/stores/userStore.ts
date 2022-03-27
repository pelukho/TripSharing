import {User, UserFormValues} from "../models/User";
import {makeAutoObservable, runInAction} from "mobx";
import apiService from "../api/apiService";
import {store} from "./store";

export default class UserStore {
    user: User | null = null;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    get isLoggedIn() {
        return !!this.user;
    }
    
    login = async (creds: UserFormValues) => {
        try {
            const user = await apiService.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
        } catch (e) {
            throw e;
        }
    }
    
    logout = () => {       
        store.commonStore.setToken(null);
        window.localStorage.removeItem('tripsharing_jwt');
        this.user = null;
    }
    
    getUser = async () => {
        try {
            const user = await apiService.Account.current();
            runInAction(() => this.user = user);
        } catch (e) {
            console.log(e);
        }
    };
    
    registerUser = async (creds: UserFormValues) => {
        try {
            const user = await apiService.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
        } catch (e) {
            throw e;
        }
    };
    
    setImage = (image: string) => {
        if(this.user) {
            this.user.image = image;
        }
    }
}
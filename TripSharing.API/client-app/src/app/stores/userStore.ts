import {User, UserFormValues} from "../models/User";
import {makeAutoObservable} from "mobx";
import apiService from "../api/apiService";

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
            console.log(user);
        } catch (e) {
            throw e;
        }
    }
}
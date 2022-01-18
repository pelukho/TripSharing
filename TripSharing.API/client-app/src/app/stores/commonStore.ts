import {makeAutoObservable, reaction} from "mobx";

export default class CommonStore {
    token: string | null = window.localStorage.getItem('tripsharing_jwt');
    appLoaded = false;
    
    constructor() {
        makeAutoObservable(this);  
        
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('tripsharing_jwt', token);
                } else {
                    window.localStorage.removeItem('tripsharing_jwt');
                }   
            }
        );
    }
    
    setToken = (token: string | null) => {        
        this.token = token;
    };
    
    setAppLoaded = () => {
        this.appLoaded = true;
    }
}
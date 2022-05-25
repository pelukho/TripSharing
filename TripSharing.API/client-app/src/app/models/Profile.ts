import {User} from "./User";

export interface Profile {
    username: string;
    phone?: string,
    displayName: string;
    image?: string;
    bio?: string;
    hasCar?: boolean,
    photos?: Photo[]
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.userName;
        this.displayName = user.displayName;
        this.phone = user.phone;
        this.hasCar = user.hasCar;
        this.image = user.image;
    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}
import {Profile} from "./Profile";

export interface Trip {
    id: string;
    date: Date | null;
    status: boolean;
    from?: string;
    to?: string;
    places?: number;
    driverName: string;
    isCancelled: boolean;
    isGoing: boolean;
    isDriver: boolean;
    driver?: Profile;
    attendees: Profile[]
}

export class Trip implements Trip {
    constructor(init?: TripFormValues) {
        Object.assign(this, init);
    }
}

export class TripFormValues {
    id?: string = undefined;
    date: Date | null = null;
    status: boolean = false;
    from?: string = undefined;
    to?: string = undefined;
    places?: number = undefined;
    
    constructor(trip?: TripFormValues) {
        if(trip) {
            this.id = trip.id;
            this.date = trip.date;
            this.from = trip.from;
            this.to = trip.to;
            this.places = trip.places;
        }
    }
}

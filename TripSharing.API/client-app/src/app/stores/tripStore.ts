import {makeAutoObservable, runInAction} from "mobx";
import {Trip} from "../models/Trip";
import apiService from "../api/apiService";
import {format} from "date-fns";

export default class TripStore {
    tripRepository = new Map<string, Trip>();
    selectedTrip: Trip | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = true;
    submitting: boolean = false;
    loadingInitial: boolean = true;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    get tripsByDate () {
        return Array
            .from(this.tripRepository.values())
            .sort((a, b) => a.date!.getTime() - b.date!.getTime())
    }
    
    get getGroupedTrips() {
        return Object.entries(
            this.tripsByDate.reduce((trips, trip) => {
                const date = format(trip.date!, 'dd MMM yyyy');
                trips[date] = trips[date] ? [...trips[date], trip] : [trip];
                
                return trips;
            }, {} as {[key: string]: Trip[]})
        );
    }
    
    loadTrips = async () => {        
        this.loadingInitial = true;
        try {
            const tripList = await apiService.Trips.list();
            runInAction(() => {
                tripList.forEach(trip => {
                    this.setTrip(trip);
                });
            });
            this.setInitialLoading(false);
        } catch(e) {
            console.log(e);
            this.setInitialLoading(false);
        }
    };
    
    loadTrip = async (id: string) => {
        let trip = this.tripRepository.get(id);
        if(trip) {
            this.selectedTrip = trip;
            return trip;
        } else {
            this.loadingInitial = true;
            try {
                trip = await apiService.Trips.details(id);
               this.setTrip(trip);
                runInAction(() => {
                    this.selectedTrip = trip;
                });
                this.setInitialLoading(false);
                return trip;
            } catch (e) {
                console.log(e);
                this.setInitialLoading(false);
            }
        }
    };
    
    setInitialLoading = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    setEditMode = (state: boolean) => {
        this.editMode = state;
    }
    
    setTrip = (trip: Trip) => {
        trip.date = new Date(trip.date!);
        this.tripRepository.set(trip.id, trip);
    }
    
    createTrip = async (trip: Trip) => {
        this.loading = true;        
        try {
            await apiService.Trips.create(trip);
            runInAction(() => {
                this.setTrip(trip);
                this.selectedTrip = trip;
                this.setEditMode(false);
                this.loading = false;
            });
        } catch (e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
    
    updateTrip = async (trip: Trip) => {
        this.loading = true;
        
        try {
            await apiService.Trips.update(trip);
            runInAction(() => {
                this.setTrip(trip);
                this.selectedTrip = trip;
                this.editMode = false;
                this.loading = false;
            });
        } catch (e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
    
    deleteTrip = async (id: string) => {
        this.loading = true;
        try {
            await apiService.Trips.delete(id);
            runInAction(() => {
                this.tripRepository.delete(id);
                this.loading = false;
            });
        } catch(e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}
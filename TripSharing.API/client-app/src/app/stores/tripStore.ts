import {makeAutoObservable, runInAction} from "mobx";
import {Trip, TripFormValues} from "../models/Trip";
import apiService from "../api/apiService";
import {format} from "date-fns";
import {store} from "./store";
import {Profile} from "../models/Profile";

export default class TripStore {
    tripRepository = new Map<string, Trip>();
    selectedTrip: Trip | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
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
        const user = store.userStore.user;
        if(user) {
            trip.isGoing = trip.attendees!.some(a => a.username === user.userName);
            trip.isDriver = trip.driverName === user.userName;
            trip.driver = trip.attendees?.find(x => x.username === trip.driverName);
        }
        trip.date = new Date(trip.date!);
        this.tripRepository.set(trip.id, trip);
    }
    
    createTrip = async (trip: TripFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);
        try {
            await apiService.Trips.create(trip);
            const newTrip = new Trip(trip);
            newTrip.driverName = user!.userName;
            newTrip.attendees = [attendee];
            runInAction(() => {
                this.setTrip(newTrip);
                this.selectedTrip = newTrip;
            });
        } catch (e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
    
    updateTrip = async (trip: TripFormValues) => {
        try {
            await apiService.Trips.update(trip);
            runInAction(() => {
                if(trip.id) {
                    let updatedTrip = {...this.tripRepository.get(trip.id), ...trip};
                    this.setTrip(updatedTrip as Trip);
                    this.selectedTrip = updatedTrip as Trip;
                }
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
    
    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        
        try {
            await apiService.Trips.attend(this.selectedTrip!.id);
            runInAction(() => {
               if(this.selectedTrip?.isGoing) {
                   this.selectedTrip.attendees = this
                       .selectedTrip
                       .attendees
                       ?.filter(a => a.username !== user?.userName);
                   this.selectedTrip.isGoing = false;
               } else {
                   const attendee = new Profile(user!);
                   this.selectedTrip?.attendees?.push(attendee);
                   this.selectedTrip!.isGoing = true;
               }
               this.tripRepository.set(this.selectedTrip!.id, this.selectedTrip!);
            });
        } catch (e) {
            console.log(e);
        } finally {
            runInAction(() => this.loading = false);
        }
    };
    
    cancelTripToggle = async () => {
        this.loading = true;
        try {
            await apiService.Trips.attend(this.selectedTrip!.id);
            runInAction(() => {
                this.selectedTrip!.isCancelled = !this.selectedTrip?.isCancelled;
                this.tripRepository.set(this.selectedTrip!.id, this.selectedTrip!)
            });
        } catch (e) {
            console.log(e);
        } finally {
            runInAction(() => this.loading = false);
        }
    };
    
    clearSelectedTrip = () => {
        this.selectedTrip = undefined;
    };
}
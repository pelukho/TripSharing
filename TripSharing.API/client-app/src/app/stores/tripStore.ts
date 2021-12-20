import {makeAutoObservable, runInAction} from "mobx";
import {Trip} from "../models/Trip";
import apiService from "../api/apiService";
import {v4 as uuid} from 'uuid';

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
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    }
    
    loadTrips = async () => {        
        try {
            const tripList = await apiService.Trips.list();
            tripList.forEach(trip => {
                this.tripRepository.set(trip.id, trip);
            });
            this.setInitialLoading(false);
        } catch(e) {
            console.log(e);
            this.setInitialLoading(false);
        }
    };
    
    setInitialLoading = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    setSelectedTrip = (trip: Trip) => {
        this.selectedTrip = trip;
    };
    
    getSelectedTrip = (id: string) => {
        this.selectedTrip = this.tripRepository.get(id);
    };
    
    cancelSelectedTrip = () => {
        this.selectedTrip = undefined;
    };
    
    setEditMode = (state: boolean) => {
        this.editMode = state;
    }
    
    setSubmitting = (state: boolean) => {
        this.submitting = state;
    };
    
    openForm = (id?: string ) => {
        id ? this.getSelectedTrip(id) : this.cancelSelectedTrip();
        this.editMode = true;
    };
    
    closeForm = () => {
        this.editMode = false;
    };
    
    createTrip = async (trip: Trip) => {
        this.loading = true;
        trip.id = uuid();
        
        try {
            await apiService.Trips.create(trip);
            runInAction(() => {
                this.tripRepository.set(trip.id, trip);
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
                this.tripRepository.set(trip.id, trip);
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
                if(this.selectedTrip?.id === id) {
                    this.cancelSelectedTrip();
                }
            });
        } catch(e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}
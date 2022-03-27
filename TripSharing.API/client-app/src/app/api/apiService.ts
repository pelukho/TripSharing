import axios, {AxiosError, AxiosResponse} from "axios";
import {Trip, TripFormValues} from '../models/Trip';
import {toast} from "react-toastify";
import {User, UserFormValues} from "../models/User";
import {store} from "../stores/store";
import {Photo, Profile} from "../models/Profile";

axios.defaults.baseURL = 'http://localhost:5000/api';

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
};

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
  
    if(token) {
        config!.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
});

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status} = error.response!;
    
    switch (status) {
        case 400:
            if(data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data)
            }
            break;
        case 401:
            toast.error('unauthorized')
            break;
        case 404:
            toast.error('not found')
            break;
        case 500:
            toast.error('server error')
            break;
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data,
    requests = {
        get: <T> (url: string) => axios.get<T>(url).then(responseBody),
        post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
        put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
        delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
    },
    Trips = {
        list: () => requests.get<Trip[]>('/trips'),
        details: (id: string) => requests.get<Trip>(`/trips/${id}`),
        create: (trip: TripFormValues) => requests.post<void>('/trips', trip),
        update: (trip: TripFormValues) => requests.put<void>(`/trips/${trip.id}`, trip),
        delete: (id: string) => requests.delete<void>(`/trips/${id}`),
        attend: (id: string) => requests.post<void>(`/trips/${id}/attend`, {})
    },
    Account = {
        current: () => requests.get<User>('/account'),
        login: (user: UserFormValues) => requests.post<User>('/account/login', user),
        register: (user: UserFormValues) => requests.post<User>('/account/register', user)
    },
    Profiles = {
        get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
        uploadPhoto: (file: Blob) => {
            let formData = new FormData();
            formData.append('File', file);
            
            return axios.post<Photo>('/photos', formData, {
                headers: {'Content-type': 'multipart/form-data'}
            });
        },
        setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
        deletePhoto: (id: string) => requests.delete(`/photos/${id}`)
    },
    apiService = {
        Trips,
        Account,
        Profiles
    };

export default apiService;
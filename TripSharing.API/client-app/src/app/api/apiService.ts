import axios, {AxiosError, AxiosResponse} from "axios";
import { Trip } from '../models/Trip';
import {toast} from "react-toastify";

axios.defaults.baseURL = 'http://localhost:5000/api';

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
};

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status} = error.response!;
    
    switch (status) {
        case 400:
            toast.error('bad request')
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
        create: (trip: Trip) => requests.post<void>('/trips', trip),
        update: (trip: Trip) => requests.put<void>(`/trips/${trip.id}`, trip),
        delete: (id: string) => requests.delete<void>(`/trips/${id}`),
    },
    apiService = {
        Trips
    };

export default apiService;
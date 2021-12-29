import axios, {AxiosResponse} from "axios";
import { Trip } from '../models/Trip';

axios.defaults.baseURL = 'http://localhost:5000/api';

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
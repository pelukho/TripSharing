export interface User {
    userName: string,
    displayName: string,
    token: string,
    phone?: string,
    hasCar?: boolean,
    image?: string
}

export interface UserFormValues {
    email: string,
    phone?: string,
    password: string,
    displayName?: string,
    hasCar?: boolean,
    username?: string
}
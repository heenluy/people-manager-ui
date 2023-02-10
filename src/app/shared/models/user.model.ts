export interface User {
    userId?: number,
    username?: string,
    email: string,
    password: string,
    authorities?: string[],
    _links?: any
}

export interface SimpleUser {
    email: string,
    password: string,
    authorities?: string[],
    _links?: any
}
export interface Addresses {
    _embedded: {
        addressList: Address[]
    }
}

export interface Address {
    addressId: number,
    street: string,
    postalCode: string,
    number: string,
    city: string,
    preferred: boolean,
    _links?: any
}
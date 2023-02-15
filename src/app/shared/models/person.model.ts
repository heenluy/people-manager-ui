import { Address } from "./address.model";

export interface PersonHal {
    _embedded: { personList: Person[]; }
}

export interface Person {
    personId?: number,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    addresses?: Address[],
    _links?: { self: { href: string } }[]
}
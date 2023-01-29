import { Address } from './address.model';

export interface Person {
    personId?: number,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    addresses: Address[]
}
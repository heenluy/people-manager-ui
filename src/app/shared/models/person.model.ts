export interface PersonHal {
    _embedded: { personList: Person[]; }
}

export interface Person {
    personId?: number,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    _links?: { self: { href: string } }[]
}
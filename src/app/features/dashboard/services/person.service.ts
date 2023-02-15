import { Person, PersonHal } from '../../../shared/models/person.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { defaultIfEmpty, delay, map, Observable, of } from 'rxjs';

@Injectable()
export class PersonService {
    private readonly baseUrl = "api/persons";
    private httpOptions = {
        headers: new HttpHeaders({
            'accept': ['application/hal+json', 'application/json'],
            'content-type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {}
    
    getPersons(): Observable<Person[]> {
        const list: Person[] = [
            {
                personId: 1,
                firstName: "Henrique",
                lastName: "Luiz",
                dateOfBirth: new Date(1999,6,14)
            },
            {
                personId: 2,
                firstName: "João",
                lastName: "Lucas",
                dateOfBirth: new Date(1997,2,6)
            },
            {
                personId: 3,
                firstName: "Maria",
                lastName: "Fernandes",
                dateOfBirth: new Date(1995,1,24)
            },
            {
                personId: 4,
                firstName: "Lia",
                lastName: "Mendes",
                dateOfBirth: new Date(1999,5,27)
            },
            {
                personId: 5,
                firstName: "Gabriel",
                lastName: "Salgado",
                dateOfBirth: new Date(1999,5,27)
            },
            {
                personId: 6,
                firstName: "Fábio",
                lastName: "Santos",
                dateOfBirth: new Date(1999,5,27)
            }
            ,{
                personId: 7,
                firstName: "Everton",
                lastName: "Souza",
                dateOfBirth: new Date(2001,3,14)
            }
        ];
        return of(list).pipe(delay(1500));
        //return this.http.get<PersonHal>(this.baseUrl + "/get/all?page=0&size=3")
        //    .pipe(
        //        map(({ _embedded }) => _embedded.personList),
        //        defaultIfEmpty(list)
        //    );
    }
}
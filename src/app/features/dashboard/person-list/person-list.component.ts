import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { Person } from 'src/app/shared/models/person.model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  
  persons: Person[] = [];
  fetched = false;
  loading = true;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.getPersons()
      .subscribe((data) => {
        this.persons = data;
        if(this.persons.length !== 0) {
          this.fetched = true;
        }
        this.loading = false;
      });
  }
}

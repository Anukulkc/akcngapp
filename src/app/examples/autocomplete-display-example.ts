import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from '../services/akc.service';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

@Component({
  selector: 'autocomplete-display-example',
  templateUrl: './autocomplete-display-example.html',
  styleUrls: ['./autocomplete-display-example.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
  ],
})
export class AutocompleteDisplayExample implements OnInit, OnDestroy {

  private _ngUnsubscribe = new Subject<void>();

  constructor(private _user: UserService) {}

  myControl = new FormControl();

  filteredUsers!: Observable<User[]>;
  users: User[] = [];

  ngOnInit() {
    this._user.getUsersData().
  pipe(
    takeUntil(this._ngUnsubscribe)
  ).subscribe(users => {
    this.users = users;
    this.filteredUsers = this.myControl.valueChanges.
    pipe(startWith(''),
    map(value => this._filterUsers(value))
    )
  }); 
}  

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(filterValue) ||
      user.email.toLowerCase().includes(filterValue) ||
      user.username.toLowerCase().includes(filterValue)
    );
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

}
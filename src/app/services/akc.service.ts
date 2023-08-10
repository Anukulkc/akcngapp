import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";

interface Geo {
    lat: string;
    lng: string;
  }
  
  interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  }
  
  interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }
  
  interface UserDetail {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  }

@Injectable ({
    providedIn: 'root',
})
export class UserService {

    private _userUrl = 'https://jsonplaceholder.typicode.com/users';
    private readonly _httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json '}),
    };
    constructor(private _http: HttpClient) {}

    getUsersData(): Observable<UserDetail[]> {
        return this._http.get<UserDetail[]>(this._userUrl, this._httpOptions)
    }
}
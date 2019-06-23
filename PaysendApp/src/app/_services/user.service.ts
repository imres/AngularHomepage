import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../_services/index';
import { User, ImageLink, UserLink, Person } from '../_models/index';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService extends BaseService {
    constructor(injector: Injector) {
        super(injector);
    }

    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    private postheader = new Headers({
        'Content-Type': 'application/json;charset=UTF-8'
    });

    // getById(id: number) {
    //     return this.http.get('/api/users/' + id, this.jwt())
    //         .pipe(map((response: Response) =>
    //             response.json()
    //         ));
    // }

    getAllUsers() {
        return this.http.get(this.apiRoute + 'User/GetAllUsers')
            .pipe(map((response: Response) =>
                response.json()
            ));
    }

    create(user: Person) {
        console.log(user);
        return this.http.post(this.apiRoute + 'User/Register',
            JSON.stringify(user),
            { headers: this.headers })
            .pipe(map((response: Response) =>
                response.json()
            ));
    }

    update(user: Person) {
        console.log(user);
        return this.http.post(this.apiRoute + 'User/Update',
            JSON.stringify(user),
            { headers: this.headers })
            .pipe(map((response: Response) => {
                let user = response.json();
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return response.json();
                }
            }));
    }

    // delete(id: number) {
    //     return this.http.delete('/api/users/' + id, this.jwt()).pipe(map((response: Response) => response.json()));
    // }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new HttpHeaders({ 'Authorization': 'Bearer ${currentUser.token}' });
            return this.http.post(this.apiRoute, {}, {headers: headers });
        }
    }
}
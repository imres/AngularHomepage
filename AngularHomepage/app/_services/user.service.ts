import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthenticationService } from '../_services/index';
import { User, ImageLink, UserLink, Person } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    headers = new Headers({
        'Content-Type': 'application/json'
    });

    private postheader = new Headers({
        'Content-Type': 'application/json;charset=UTF-8'
    });
    
    //getPackage() {
    //    return this.http.get('http://localhost:65192/api/PackageInformation/PostGet/2')
    //        .map((response: Response) =>
    //            response.json()
    //        );
    //}

    //getPackage(consignment: Person) {
    //    console.log(user);
    //    return this.http.post('http://localhost:65192/api/PackageInformation/PostGet',
    //        JSON.stringify(user),
    //        { headers: this.headers })
    //        .map((response: Response) =>
    //            response.json()
    //        );
    //}


    //https://api.aftership.com/v4/trackings/:slug/:RR747540648SE
    /*getAll(id: number) {
        return this.http.get('http://localhost:65192/api/User/GetById/'+id)
            .map((response: Response) => response.json());
    }*/

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt())
            .map((response: Response) =>
                response.json()
            );
    }

    getAllUsers() {
        return this.http.get('http://localhost:65192/api/User/GetAllUsers')
            .map((response: Response) =>
                response.json()
            );
    }

    create(user: Person) {
        console.log(user);
        return this.http.post('http://localhost:65192/api/User/Register',
            JSON.stringify(user),
            { headers: this.headers })
            .map((response: Response) =>
                response.json()
            );
    }

    update(user: Person) {
        console.log(user);
        return this.http.post('http://localhost:65192/api/User/Update',
            JSON.stringify(user),
            { headers: this.headers })
            .map((response: Response) => {
                let user = response.json();
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return response.json();
                }
            });
    }

    //update(user: User) {
    //    return this.http.put('/api/users/' + user.Id, user, this.jwt()).map((response: Response) => response.json());
    //}

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    //Post Link
    /*addLink(link: UserLink) {
        console.log(link);
        return this.http.post('http://localhost:65192/api/User/AddLink',
            JSON.stringify(link),
            { headers: this.headers })
            .map((response: Response) =>
                response.json()
            );
    }

    //Remove By Id
    removeLinkById(id: number) {
        return this.http.post('http://localhost:65192/api/User/RemoveLinkById/' + id,
            JSON.stringify(id),
            { headers: this.headers })
            .map((response: Response) =>
                response.json()
            );
    }*/
}
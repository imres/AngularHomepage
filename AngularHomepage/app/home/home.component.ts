import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { User, ImageLink, UserLink } from '../_models/index';
import { UserService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    //imageUrls: ImageLink[];
    //newLink: any = {};
    showDialog = false;
    //loadingImages: boolean;
    //linkAdded: boolean;
    isClassActive: boolean;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isClassActive = false;
    }

    ngOnInit() {
    }

    /*private loadAllUsers() {
        this.loadingImages = true;
        this.userService.getAll(this.currentUser.Id).subscribe(res => {
            this.imageUrls = res;
            
            this.loadingImages = false;

            //Animate added link
            this.linkAdded ? this.isClassActive = true : this.linkAdded = false;
            setTimeout(() => {
                this.linkAdded = false;
                this.isClassActive = false;
            }, 1000);
        });
    }*/

    /*private AddLink(isValid: boolean) {
        this.userService.addLink(this.newLink).subscribe(res => {
            this.loadAllUsers();
            this.resetDialog();
            this.linkAdded = true;
        });
    }

    public removeClicked(event: any) {
        this.imageUrls = this.imageUrls.filter(obj => obj.Id !== event.Id);

        this.userService.removeLinkById(event.Id).subscribe(res => {
            this.loadAllUsers();
        });
    }*/

    //Functions && methods

    

    /*public imageClicked(link: string) {
        window.open(link, "_self");
    }

    private IsNullOrEmpty(item: any) {
        if (item == null || item == 'undefined' || item.length == 0){
            return true;
        } else {
            return false;
        }
    }

    public setAnimateClass() {
        let classes = {
            animated: this.isClassActive
        };
        return classes;
    }*/


}
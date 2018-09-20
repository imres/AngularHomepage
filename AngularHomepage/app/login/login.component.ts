import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    selector: 'login',
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    bankIdPending: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    bankIdAuth() {
        this.authenticationService.bankIdAuth(this.model.PersonId)
            .subscribe(
            res => {
                this.bankIdPending = true;

                this.authenticationService.bankIdCollect(res).subscribe(data => {
                    this.bankIdPending = false;
                    this.router.navigate([this.returnUrl]);
                }, error => {
                    this.bankIdPending = false;
                    this.alertService.error(error);
                });

            }, error => {
                this.alertService.error(error);
            });
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.Email, this.model.Password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Person } from '../_models/index';

import { AlertService, UserService, AuthenticationService } from '../_services/index';

@Component({
    // moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: Person = new Person();
    loading = false;
    returnUrl: string;
    bankIdPending: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
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
}

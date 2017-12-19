﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent, LoginSiteComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { FrontComponent } from './frontpage/index';
import { UserProfileComponent } from './user-profile/user-profile.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    //{ path: 'login', component: LoginComponent },
    { path: 'login', component: LoginSiteComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'front', component: FrontComponent },
    { path: 'profile', component: UserProfileComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
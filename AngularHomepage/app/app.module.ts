import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, InvitationService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { FrontComponent } from './frontpage/index';
import { ConfirmComponent } from './_dialog/confirm.component';
import { InviteResponseComponent } from './_dialog/invite-response.component';
import { LoadingComponent } from './_directives/loading.component';
import { InvitationComponent } from './home/invitation/invitation.component';
import { NavbarComponent } from './commonComponents/navbar.component';
import { LoginSiteComponent } from './login/loginsite.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        routing,
        BootstrapModalModule
    ],
    declarations: [
        AppComponent,
        InvitationComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        FrontComponent,
        ConfirmComponent,
        InviteResponseComponent,
        LoadingComponent,
        NavbarComponent,
        LoginSiteComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        InvitationService,

        // providers used to create fake backend
        //fakeBackendProvider,
        //MockBackend,
        //BaseRequestOptions
    ],
    entryComponents: [
        ConfirmComponent,
        InviteResponseComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
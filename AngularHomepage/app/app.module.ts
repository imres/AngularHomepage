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
import { routing } from './app.routing';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import {
    AlertService, AuthenticationService, UserService, InvitationService, ConsignmentService,
    ToastrService, PaymentService, FilterService, AdministratorService, PagerService
} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { FrontComponent } from './frontpage/index';
import { UserGuideComponent } from './commonComponents/user-guide.component';
import { ConfirmComponent } from './_dialog/confirm.component';
import { InviteResponseComponent } from './_dialog/invite-response.component';
import { LoadingComponent } from './_directives/loading.component';
import { InvitationComponent } from './home/invitation/invitation.component';
import { ConsignmentComponent } from './home/consignment/consignment.component';
import { ConsignmentHistoryComponent } from './home/consignment/consignment-history.component';
import { NavbarComponent } from './commonComponents/navbar.component';
import { NavbarHomeComponent } from './commonComponents/navbar-home.component';
import { ClickStopPropagation } from './commonComponents/navbar.component';
import { LoginSiteComponent } from './login/loginsite.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ActiveInvitationComponent } from './home/invitation/active-invitation.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { AdminPanel } from './home/administrator/admin-panel.component';
import { UserSettingsComponent } from './home/user-settings/user-settings.component'

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        routing,
        BootstrapModalModule,
        ToastModule.forRoot()
    ],
    declarations: [
        AppComponent,
        InvitationComponent,
        ConsignmentComponent,
        ConsignmentHistoryComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        LoadingComponent,
        FrontComponent,
        ConfirmComponent,
        InviteResponseComponent,
        NavbarComponent,
        ClickStopPropagation,
        LoginSiteComponent,
        UserProfileComponent,
        NavbarHomeComponent,
        UserGuideComponent,
        ActiveInvitationComponent,
        SidebarComponent,
        AdminPanel,
        UserSettingsComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        InvitationService,
        ConsignmentService,
        ToastrService,
        PaymentService,
        FilterService,
        AdministratorService,
        PagerService,

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
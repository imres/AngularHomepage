import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontComponent } from './frontpage';
import { BasicComponent } from './shared/basic.component';
import { NavbarComponent } from './shared/navbar.component';
import { NavbarHomeComponent } from './shared/navbar-home.component';
import { UserGuideComponent } from './shared/user-guide.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent, LoginSiteComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService, InvitationService, ConsignmentService, ToastrService, PaymentService, FilterService, AdministratorService, PagerService } from './_services';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { ActiveInvitationComponent } from './home/invitation/active-invitation.component';
import { ConsignmentComponent } from './home/consignment/consignment.component';
import { AdminPanel } from './home/administrator/admin-panel.component';
import { FilterPipe } from './filter.pipe';
import { AlertComponent } from './_directives';
import { LoadingComponent } from './_directives/loading.component';
import { ConsignmentHistoryComponent } from './home/consignment/consignment-history.component';
import { ConsignmentDetailComponent } from './home/consignment/consignment-detail.component';
import { ConsignmentNotificationComponent } from './home/consignment/consignment-notification.component';
import { InvitationComponent } from './home/invitation/invitation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSettingsComponent } from './user-profile/user-settings.component';
import { FriendsComponent } from './user-profile/friends.component';
import { UserComponent } from './user-profile/user.component';
import { SendInvitationDialogComponent } from './shared/dialogs/send-invitation-dialog/send-invitation-dialog.component';
import { InvitationResponseDialogComponent } from './shared/dialogs/invitation-response-dialog/invitation-response-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontComponent,
    BasicComponent,
    NavbarComponent,
    NavbarHomeComponent,
    UserGuideComponent,
    LoginComponent,
    LoginSiteComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    ActiveInvitationComponent,
    ConsignmentComponent,
    AdminPanel,
    FilterPipe,
    AlertComponent,
    LoadingComponent,
    ConsignmentHistoryComponent,
    ConsignmentDetailComponent,
    ConsignmentNotificationComponent,
    InvitationComponent,
    UserProfileComponent,
    UserSettingsComponent,
    FriendsComponent,
    UserComponent,
    SendInvitationDialogComponent,
    InvitationResponseDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
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
  ],
  entryComponents: [
    SendInvitationDialogComponent,
    InvitationResponseDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// import { NgModule, Injector }      from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule }    from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BootstrapModalModule } from 'ng2-bootstrap-modal';

// // used to create fake backend
// import { fakeBackendProvider } from './_helpers/index';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { BaseRequestOptions } from '@angular/http';

// import { AppComponent }  from './app.component';
// import { routing } from './app.routing';
// import { ToastModule } from 'ng2-toastr/ng2-toastr';

// import { AlertComponent } from './_directives/index';
// import { AuthGuard } from './_guards/index';
// import {
//     AlertService, AuthenticationService, UserService, InvitationService, ConsignmentService,
//     ToastrService, PaymentService, FilterService, AdministratorService, PagerService
// } from './_services/index';
// import { HomeComponent } from './home/index';
// import { LoginComponent } from './login/index';
// import { RegisterComponent } from './register/index';
// import { FrontComponent } from './frontpage/index';
// import { UserGuideComponent } from './commonComponents/user-guide.component';
// import { ConfirmComponent, InviteResponseComponent, StripeCheckout} from './_dialog/index';
// import { LoadingComponent } from './_directives/loading.component';
// import { InvitationComponent } from './home/invitation/invitation.component';
// import { ConsignmentComponent } from './home/consignment/consignment.component';
// import { ConsignmentHistoryComponent } from './home/consignment/consignment-history.component';
// import { ConsignmentDetailComponent } from './home/consignment/consignment-detail.component';
// import { ConsignmentNotificationComponent } from './home/consignment/consignment-notification.component';
// import { NavbarComponent } from './commonComponents/navbar.component';
// import { NavbarHomeComponent } from './commonComponents/navbar-home.component';
// import { ClickStopPropagation } from './commonComponents/navbar.component';
// import { LoginSiteComponent } from './login/loginsite.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';
// import { UserComponent } from './user-profile/user.component';
// import { ActiveInvitationComponent } from './home/invitation/active-invitation.component';
// import { SidebarComponent } from './home/sidebar/sidebar.component';
// import { AdminPanel } from './home/administrator/admin-panel.component';
// import { UserSettingsComponent } from './user-profile/user-settings.component';
// import { BasicComponent } from './shared/basic.component';
// import { FriendsComponent } from './user-profile/friends.component';
// import { FilterPipe } from './filter.pipe';
// import { BaseService } from './_services/base.service';
// import { RouterModule } from '@angular/router';
// import { SendInvitationDialogComponent } from './_dialog/send-invitation-dialog.component';
// import { InvitationResponseDialogComponent } from './_dialog/invitation-response-dialog.component';
// import { StripeCheckoutDialogComponent } from './_dialog/stripe-checkout-dialog.component';

// @NgModule({
//     imports: [
//         BrowserModule,
//         BrowserAnimationsModule,
//         FormsModule,
//         HttpModule,
//         routing,
//         BootstrapModalModule,
//         ToastModule.forRoot(),
//         RouterModule
//     ],
//     declarations: [
//         AppComponent,
//         InvitationComponent,
//         ConsignmentComponent,
//         ConsignmentHistoryComponent,
//         ConsignmentDetailComponent,
//         ConsignmentNotificationComponent,
//         AlertComponent,
//         HomeComponent,
//         LoginComponent,
//         RegisterComponent,
//         LoadingComponent,
//         FrontComponent,
//         ConfirmComponent,
//         InviteResponseComponent,
//         StripeCheckout,
//         NavbarComponent,
//         ClickStopPropagation,
//         LoginSiteComponent,
//         UserProfileComponent,
//         UserComponent,
//         NavbarHomeComponent,
//         UserGuideComponent,
//         ActiveInvitationComponent,
//         SidebarComponent,
//         AdminPanel,
//         UserSettingsComponent,
//         FriendsComponent,
//         BasicComponent,
//         FilterPipe,
//     ],
//     providers: [
//         AuthGuard,
//         AlertService,
//         AuthenticationService,
//         UserService,
//         InvitationService,
//         ConsignmentService,
//         ToastrService,
//         PaymentService,
//         FilterService,
//         AdministratorService,
//         PagerService,

//         // providers used to create fake backend
//         //fakeBackendProvider,
//         //MockBackend,
//         //BaseRequestOptions
//     ],
//     entryComponents: [
//         SendInvitationDialogComponent,
//         InvitationResponseDialogComponent,
//         StripeCheckoutDialogComponent
//     ],
//     bootstrap: [AppComponent]
// })

// export class AppModule { }
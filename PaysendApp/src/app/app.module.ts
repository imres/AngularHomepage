import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontComponent } from './frontpage';
import { BasicComponent } from './shared/basic.component';
import { NavbarComponent } from './shared/navbar.component';
import { NavbarHomeComponent } from './shared/navbar-home.component';
import { UserGuideComponent } from './shared/user-guide.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FrontComponent,
    BasicComponent,
    NavbarComponent,
    NavbarHomeComponent,
    UserGuideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PaysendApp';

  onActivate(event) {
    window.scroll(0, 0);
  //or document.body.scrollTop = 0;
  //or document.querySelector('body').scrollTo(0,0)
  }
}
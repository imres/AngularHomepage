import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { BasicComponent } from '../shared/basic.component';

@Component({
    moduleId: module.id,
    templateUrl: 'front.component.html'
})

export class FrontComponent extends BasicComponent implements OnInit  {
    ngOnInit() {

    }
}
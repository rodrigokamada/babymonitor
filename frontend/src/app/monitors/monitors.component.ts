import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Environments
import { environment } from '../../environments/environment';

// Models
import { MonitorsModel } from './monitors.model';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss'],
})
export class MonitorsComponent {

  monitor: MonitorsModel;

  constructor(private router: Router) {
    this.monitor = new MonitorsModel();
  }

}

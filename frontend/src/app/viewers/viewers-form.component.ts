import { AfterViewInit, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as QRCode from 'qrcode';

// Models
import { MonitorsModel } from '../monitors/monitors.model';

@Component({
  selector: 'app-viewers-form',
  templateUrl: './viewers-form.component.html',
  styleUrls: ['./viewers-form.component.scss'],
})
export class ViewersFormComponent implements AfterViewInit {

  monitor?: MonitorsModel;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngAfterViewInit(): void {
    const options = {
      margin: 0,
      width: 200,
    };

    QRCode.toCanvas(document.getElementById('qrcode'), this.monitor?.code!, options, (error: any) => {
      console.error(error);
    });
  }

}

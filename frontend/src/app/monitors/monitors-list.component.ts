import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

// Services
import { MonitorsService } from './monitors.service';
import { ViewersService } from '../viewers/viewers.service';

// Models
import { MonitorsModel } from './monitors.model';

@Component({
  selector: 'app-monitors-list',
  templateUrl: './monitors-list.component.html',
  styleUrls: ['./monitors-list.component.scss'],
})
export class MonitorsListComponent implements OnInit {

  page: number;
  total: number;
  monitorsList: MonitorsModel[];
  notFound: boolean;
  monitor: MonitorsModel|undefined;
  modal: any;

  constructor(private router: Router,
              private modalService: NgbModal,
              private spinnerService: NgxSpinnerService,
              private toastrService: ToastrService,
              private translocoService: TranslocoService,
              private monitorsService: MonitorsService,
              private viewersService: ViewersService) {
    this.page = 1;
    this.total = 0;
    this.monitorsList = [];
    this.notFound = false;
    this.monitor = undefined;
    this.modal = undefined;
  }

  ngOnInit(): void {
    this.load(true);
  }

  public load(reset: boolean): void {
    this.spinnerService.show();
    this.notFound = false;

    if (reset) {
      this.page = 1;
      this.monitorsList = [];
    } else {
      this.page++;
    }

    this.monitorsService.find(this.page)
    .subscribe({
      next: (success: any) => {
        if (success) {
          this.total = success.total;
          this.monitorsList = this.monitorsList.concat(success.monitors);
        }

        if (this.total === 0) {
          this.notFound = true;
        }

        this.spinnerService.hide();
      }, error: (error: any) => {
        this.spinnerService.hide();
        this.translocoService.selectTranslate('error.problem')
        .subscribe((message: string) => this.toastrService.error(message));
      },
    });
  }

  public openView(monitor: MonitorsModel): void {
    this.spinnerService.show();
    this.router.navigate(['/viewers'], { queryParams: { ...monitor }, skipLocationChange: true });
  }

  public openForm(id?: string): void {
    this.spinnerService.show();
    this.router.navigate(['/monitors/form'], { queryParams: { id }, skipLocationChange: true });
  }

  public openAdd(modal: any): void {
    this.monitor = new MonitorsModel();
    this.modal = this.modalService.open(modal, { backdrop: 'static', centered: true, size: 'sm' });
  }

  public add(form: NgForm): void {
    this.spinnerService.show();

    if (form.invalid) {
      for (const control in form.controls) {
        form.controls[control].markAsTouched();
      }
      this.spinnerService.hide();
      this.translocoService.selectTranslate('error.validation')
      .subscribe((message: string) => this.toastrService.error(message));
      return;
    }

    this.viewersService.insertByMonitorCode(this.monitor?.code!)
    .subscribe({
      next: () => {
        this.modal.close('');
        this.spinnerService.hide();
        this.translocoService.selectTranslate('monitors.addSuccess', { code: this.monitor?.code })
        .subscribe((message: string) => this.toastrService.success(message));
        this.load(true);
      }, error: (error: any) => {
        this.spinnerService.hide();
        this.translocoService.selectTranslate('error.problem')
        .subscribe((message: string) => this.toastrService.error(message));
      },
    });
  }

  public openDelete(modal: any, monitor: MonitorsModel): void {
    this.monitor = monitor;
    this.modal = this.modalService.open(modal, { backdrop: 'static', centered: true, size: 'sm' });
  }

  public delete(): void {
    this.spinnerService.show();

    this.monitorsService.delete(this.monitor?.id!)
    .subscribe({
      next: () => {
        this.modal.close('');
        this.spinnerService.hide();
        this.translocoService.selectTranslate('monitors.deleteSuccess')
        .subscribe((message: string) => this.toastrService.success(message));
        this.load(true);
      }, error: (error: any) => {
        this.spinnerService.hide();
        this.translocoService.selectTranslate('error.problem')
        .subscribe((message: string) => this.toastrService.error(message));
      },
    });
  }

}

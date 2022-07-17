import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

// Services
import { MonitorsService } from './monitors.service';

// Models
import { MonitorsModel } from './monitors.model';

@Component({
  selector: 'app-monitors-form',
  templateUrl: './monitors-form.component.html',
  styleUrls: ['./monitors-form.component.scss'],
})
export class MonitorsFormComponent implements OnInit {

  monitor: MonitorsModel;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private spinnerService: NgxSpinnerService,
              private toastrService: ToastrService,
              private translocoService: TranslocoService,
              private monitorsService: MonitorsService) {
    this.monitor = new MonitorsModel();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.loadById(params['id']);
    });
  }

  private loadById(monitorId: string): void {
    if (!monitorId) {
      this.spinnerService.hide();
      return;
    }

    this.spinnerService.show();

    this.monitorsService.findById(monitorId)
    .subscribe({
      next: (success: any) => {
        if (success) {
          this.monitor = success;
        }
        this.spinnerService.hide();
      }, error: (error: any) => {
        this.spinnerService.hide();
        this.translocoService.selectTranslate('error.problem')
        .subscribe((message: string) => this.toastrService.error(message));
      },
    });
  }

  public save(form: NgForm): void {
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

    this.monitorsService.insertOrUpdate(this.monitor)
    .subscribe({
      next: (success: any) => {
        this.spinnerService.hide();
        this.translocoService.selectTranslate('monitors.saveSuccess')
        .subscribe((message: string) => this.toastrService.success(message));
        this.router.navigate(['/monitors']);
      }, error: (error: any) => {
        this.spinnerService.hide();
        this.translocoService.selectTranslate('error.problem')
        .subscribe((message: string) => this.toastrService.error(message));
      },
    });
  }

  public back(): void {
    this.router.navigate(['/monitors']);
  }

}

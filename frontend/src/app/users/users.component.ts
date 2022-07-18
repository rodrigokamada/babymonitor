import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

// Services
import { CognitoService } from '../shared/services/cognito.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  user: any;

  constructor(private spinnerService: NgxSpinnerService,
              private toastrService: ToastrService,
              private translocoService: TranslocoService,
              private cognitoService: CognitoService) {
    this.user = {};
  }

  ngOnInit(): void {
    this.load()
  }

  private load(): void {
    this.spinnerService.show();

    this.cognitoService.getUser()
    .subscribe({
      next: (success: any) => {
        if (success) {
          this.user = success;
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

    this.cognitoService.updateUser(this.user)
    .subscribe({
      next: (success: any) => {
        this.spinnerService.hide();
        this.translocoService.selectTranslate('users.saveSuccess')
        .subscribe((message: string) => this.toastrService.success(message));
        this.load();
      }, error: (error: any) => {
        this.spinnerService.hide();
        this.translocoService.selectTranslate('error.problem')
        .subscribe((message: string) => this.toastrService.error(message));
      },
    });
  }

}

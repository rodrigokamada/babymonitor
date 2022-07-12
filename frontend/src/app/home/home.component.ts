import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

// Services
import { CognitoService } from '../shared/services/cognito.service';
import { ContactsService, IContacts } from './contacts.service';
import { StorageService } from '../shared/services/storage.service';

// Models
import { UsersModel } from '../users/users.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  userSignIn: UsersModel;
  userSignUp: UsersModel;
  contact: IContacts;

  constructor(private router: Router,
              private spinnerService: NgxSpinnerService,
              private toastrService: ToastrService,
              private translocoService: TranslocoService,
              private cognitoService: CognitoService,
              private contactsService: ContactsService,
              private storageService: StorageService) {
    this.userSignIn = new UsersModel();
    this.userSignUp = new UsersModel();
    this.contact = {} as IContacts;
  }

  public signIn(form: NgForm): void {
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

    this.cognitoService.signIn(this.userSignIn)
    .subscribe({
      next: (success: any) => {
        this.storageService.setUser(success);
        this.userSignIn = new UsersModel();
        this.spinnerService.hide();
        this.translocoService.selectTranslate('home.signInSuccess')
        .subscribe((message: string) => this.toastrService.success(message));
        form.reset();

        this.router.navigate(['/monitors']);
      }, error: (error: any) => {
        if (error && error.error && error.error.status === 'NOT_FOUND') {
          //this.messageService.showErrorKey('home.notFound');
        } else if (error && error.error && error.error.status === 'INACTIVE') {
          //this.messageService.showErrorKey('components.authentication.userInactive');
        } else {
          this.translocoService.selectTranslate('error.problem')
          .subscribe((message: string) => this.toastrService.error(message));
        }

        this.spinnerService.hide();
      },
    });
  }

  public signUp(form: NgForm): void {
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

    this.cognitoService.signUp(this.userSignUp)
    .subscribe({
      next: (success: any) => {
        this.storageService.setUser(success);
        this.userSignUp = new UsersModel();
        this.spinnerService.hide();
        this.translocoService.selectTranslate('home.signUpSuccess')
        .subscribe((message: string) => this.toastrService.success(message));
        form.reset();

        this.router.navigate(['/monitors']);
      }, error: (error: any) => {
        if (error && error.error && error.error.status === 'ALREADY_EXISTS') {
          //this.messageService.showErrorKey('home.alreadyExists');
        } else {
          this.translocoService.selectTranslate('error.problem')
          .subscribe((message: string) => this.toastrService.error(message));
        }

        this.spinnerService.hide();
      },
    });
  }

  public sendContact(form: NgForm): void {
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

    this.contactsService.send(this.contact)
    .subscribe({
      next: (success: any) => {
        this.contact = {} as IContacts;
        this.spinnerService.hide();
        this.translocoService.selectTranslate('home.messageSent')
        .subscribe((message: string) => this.toastrService.success(message));
        form.reset();
        form.controls['recaptcha'].markAsUntouched();
        form.controls['recaptcha'].markAsPristine();
      }, error: (error: any) => {
        this.spinnerService.hide();
        this.translocoService.selectTranslate('error.problem')
        .subscribe((message: string) => this.toastrService.error(message));
      },
    });
  }

}

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
  isForgotPassword: boolean;
  userForgotPassword: UsersModel;
  isChangePassword: boolean;
  userChangePassword: UsersModel;
  userSignUp: UsersModel;
  isConfirmSignUp: boolean;
  userConfirmSignUp: UsersModel;
  contact: IContacts;

  constructor(private router: Router,
              private spinnerService: NgxSpinnerService,
              private toastrService: ToastrService,
              private translocoService: TranslocoService,
              private cognitoService: CognitoService,
              private contactsService: ContactsService,
              private storageService: StorageService) {
    this.userSignIn = new UsersModel();
    this.isForgotPassword = false;
    this.userForgotPassword = new UsersModel();
    this.isChangePassword = false;
    this.userChangePassword = new UsersModel();
    this.userSignUp = new UsersModel();
    this.isConfirmSignUp = false;
    this.userConfirmSignUp = new UsersModel();
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
        if (success && success.attributes && success.signInUserSession && success.signInUserSession.idToken) {
          const user = new UsersModel();
          user.id = success.attributes.sub;
          user.email = success.attributes.email;
          user.jwt = success.signInUserSession.idToken.jwtToken;
          user.firstLetter = success.attributes.name ? success.attributes.name : success.attributes.email;
          user.firstLetter = user.firstLetter!.substring(0, 1).toUpperCase();
          this.storageService.setUser(user);
        }

        this.userSignIn = new UsersModel();
        this.spinnerService.hide();
        this.translocoService.selectTranslate('home.signInSuccess')
        .subscribe((message: string) => this.toastrService.success(message));
        form.reset();

        this.router.navigate(['/monitors']);
      }, error: (error: any) => {
        if (error && error.code === 'NotAuthorizedException') {
          this.translocoService.selectTranslate('home.signInInvalid')
          .subscribe((message: string) => this.toastrService.error(message));
        } else if (error && error.code === 'UserNotConfirmedException') {
          this.translocoService.selectTranslate('home.signInNotConfirm')
          .subscribe((message: string) => this.toastrService.error(message));
        } else {
          this.translocoService.selectTranslate('error.problem')
          .subscribe((message: string) => this.toastrService.error(message));
        }

        this.spinnerService.hide();
      },
    });
  }

  public forgotPassword(form: NgForm): void {
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

    this.cognitoService.forgotPassword(this.userForgotPassword)
    .subscribe({
      next: (success: any) => {
        this.userForgotPassword = new UsersModel();
        this.spinnerService.hide();
        this.translocoService.selectTranslate('home.forgotPasswordSuccess')
        .subscribe((message: string) => this.toastrService.success(message));
        form.reset();

        this.isForgotPassword = false;
        this.isChangePassword = true;
      }, error: (error: any) => {
        this.translocoService.selectTranslate('error.problem')
        .subscribe((message: string) => this.toastrService.error(message));

        this.spinnerService.hide();
      },
    });
  }

  public changePassword(form: NgForm): void {
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

    this.cognitoService.forgotPassword(this.userForgotPassword)
    .subscribe({
      next: (success: any) => {
        this.userForgotPassword = new UsersModel();
        this.spinnerService.hide();
        this.translocoService.selectTranslate('home.changePasswordSuccess')
        .subscribe((message: string) => this.toastrService.success(message));
        form.reset();

        this.isForgotPassword = false;
        this.isChangePassword = false;
      }, error: (error: any) => {
        this.translocoService.selectTranslate('error.problem')
        .subscribe((message: string) => this.toastrService.error(message));

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
        this.userConfirmSignUp = new UsersModel();
        this.userConfirmSignUp.email = this.userSignUp.email;

        this.userSignUp = new UsersModel();
        this.spinnerService.hide();
        this.translocoService.selectTranslate('home.signUpSuccess')
        .subscribe((message: string) => this.toastrService.success(message));
        form.reset();

        this.isConfirmSignUp = true;
      }, error: (error: any) => {
        if (error && error.code === 'InvalidPasswordException') {
          this.translocoService.selectTranslate('home.signUpInvalidPassword')
          .subscribe((message: string) => this.toastrService.error(message));
        } else if (error && error.code === 'UsernameExistsException') {
          this.translocoService.selectTranslate('home.emailAlreadyExists')
          .subscribe((message: string) => this.toastrService.error(message));
        } else {
          this.translocoService.selectTranslate('error.problem')
          .subscribe((message: string) => this.toastrService.error(message));
        }

        this.spinnerService.hide();
      },
    });
  }

  public confirmSignUp(form: NgForm): void {
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

    this.cognitoService.confirmSignUp(this.userConfirmSignUp)
    .subscribe({
      next: (success: any) => {
        this.userConfirmSignUp = new UsersModel();
        this.spinnerService.hide();
        this.translocoService.selectTranslate('home.confirmSignUpSuccess')
        .subscribe((message: string) => this.toastrService.success(message));
        form.reset();

        this.isConfirmSignUp = true;
      }, error: (error: any) => {
        if (error && error.code === 'ExpiredCodeException') {
          this.translocoService.selectTranslate('home.signUpExpired')
          .subscribe((message: string) => this.toastrService.error(message));

          this.cognitoService.resendSignUp(this.userConfirmSignUp.email!).subscribe();
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

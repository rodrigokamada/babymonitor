import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

// Services
import { StorageService } from '../shared/services/storage.service';
import { ViewersService } from '../viewers/viewers.service';

@Component({
  selector: 'app-invite',
  template: '',
})
export class InviteComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService,
              private translocoService: TranslocoService,
              private storageService: StorageService,
              private viewersService: ViewersService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['code'] && params['code'].trim().length > 0) {
        const code = params['code'].trim();
        if (this.storageService.isAuthenticated()) {
          this.viewersService.insertByMonitorCode(code)
          .subscribe({
            next: (success: any) => {
              this.translocoService.selectTranslate('invite.nowViewMonitor', { code })
              .subscribe((message: string) => this.toastrService.success(message));

              this.router.navigate(['/monitors']);
            }, error: (error: any) => {
              this.translocoService.selectTranslate('invite.alreadyViewMonitor', { code })
              .subscribe((message: string) => this.toastrService.error(message));

              this.router.navigate(['/monitors']);
            },
          });
        } else {
          this.storageService.setInviteCode(code);

          this.translocoService.selectTranslate('invite.signInBecome', { code })
          .subscribe((message: string) => this.toastrService.warning(message));

          this.router.navigate(['/home']);
        }
      } else {
        this.storageService.removeInviteCode();

        this.translocoService.selectTranslate('invite.codeNotSent')
        .subscribe((message: string) => this.toastrService.error(message));

        this.router.navigate(['/home']);
      }
    });
  }

}

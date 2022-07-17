import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';
import { Peer } from 'peerjs';
import { Socket } from 'ngx-socket-io';

// Environments
import { environment } from '../../environments/environment';

// Services
import { StorageService } from '../shared/services/storage.service';
import { ViewersService } from './viewers.service';

// Models
import { ViewersModel } from './viewers.model';

@Component({
  selector: 'app-viewers-list',
  templateUrl: './viewers.component.html',
  styleUrls: ['./viewers.component.scss'],
})
export class ViewersComponent implements AfterViewInit {

  peer: any;
  user: any;
  videos: any;
  streamLocal: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private socket: Socket,
              private spinnerService: NgxSpinnerService,
              private storageService: StorageService,
              private toastrService: ToastrService,
              private translocoService: TranslocoService,
              private viewersService: ViewersService) {
    this.peer = undefined;
    this.user = undefined;
    this.videos = undefined;
    this.streamLocal = undefined;
  }

  ngAfterViewInit(): void {
    this.user = this.storageService.getUser();

    this.peer = new Peer(this.user.id, environment.peer as any);
    //this.peer = new Peer(undefined as any, environment.peer as any);

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.loadById(params['id']);
    });
  }

  private loadById(monitorId?: string): void {
    if (!monitorId) {
      this.back();
    }

    this.videos = document.getElementById('videos');

    const videoLocal = document.createElement('video');
    videoLocal.muted = true;

    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    }).then((streamLocal: any) => {
      console.log('getUserMedia', streamLocal);
      this.streamLocal = streamLocal;
      this.addStreamToVideo(streamLocal, videoLocal);

      this.peer.on('call', (call: any) => {
        console.log('call', call);
        call.answer(streamLocal);

        const videoRemote = document.createElement('video');

        call.on('stream', (streamRemote: any) => {
          this.addStreamToVideo(streamRemote, videoRemote);
        });
      });

      this.socket.on('VIEW_CONNECT', (userId: string) => {
        console.log('VIEW_CONNECT:', userId);
        this.connectToUser(userId, streamLocal);
      });
    });

    this.peer.on('open', (id: any) => {
      console.log('open:', id);
      this.socket.emit('VIEW_OPEN', monitorId, id);
      //this.socket.emit('join-room', monitorId, id, user);
    });

    this.spinnerService.hide();
  }

  private addStreamToVideo(stream: any, video: any): void {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
      this.videos.append(video);
    });
  }

  private connectToUser(userId: string, stream: any): void {
    const call = this.peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', (streamRemote: any) => {
      this.addStreamToVideo(video, streamRemote);
    });
  }

  public back(): void {
    this.router.navigate(['/monitors']);
  }

}

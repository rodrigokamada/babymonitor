import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Peer } from 'peerjs';
import { Socket } from 'ngx-socket-io';
import { v4 as uuidv4 } from 'uuid';

// Environments
import { environment } from '../../environments/environment';

// Services
import { StorageService } from '../shared/services/storage.service';
import { ViewersService } from './viewers.service';

// Componenets
import { ViewersFormComponent } from './viewers-form.component';

// Models
import { MonitorsModel } from '../monitors/monitors.model';

@Component({
  selector: 'app-viewers-list',
  templateUrl: './viewers-list.component.html',
  styleUrls: ['./viewers-list.component.scss'],
})
export class ViewersListComponent implements AfterViewInit {

  peer: any;
  user: any;
  devices: any[];
  deviceSelect: string;
  videos: any;
  streamLocal: any;
  monitor: MonitorsModel;
  waiting: boolean;
  showCamera: boolean;
  debugger: any = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private socket: Socket,
              private spinnerService: NgxSpinnerService,
              private storageService: StorageService) {
    this.peer = undefined;
    this.user = undefined;
    this.devices = [];
    this.deviceSelect = '';
    this.videos = undefined;
    this.streamLocal = undefined;
    this.monitor = new MonitorsModel();
    this.waiting = true;
    this.showCamera = true;
  }

  ngAfterViewInit(): void {

    this.user = this.storageService.getUser();

    this.videos = document.getElementById('videos');

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.monitor.id = params['id'];
      this.monitor.code = params['code'];
      this.monitor.name = params['name'];

      this.loadDevices();
    });
  }

  private loadDevices(): void {
    navigator.mediaDevices.enumerateDevices()
    .then((devices: any) => {
      if (devices) {
        let hasCameraFront = false;
        let hasCameraBack = false;

        devices.forEach((device: any) => {
          if (device.kind === 'videoinput') {
            if (device.label.includes('front')) {
              hasCameraFront = true;
            }
            if (device.label.includes('back')) {
              hasCameraBack = true;
            }
          }
        });

        if (hasCameraFront) {
          this.devices.push({
            key: 'FRONT',
            value: 'viewers.cameraFront',
          });
        }

        if (hasCameraBack) {
          this.deviceSelect = 'BACK';

          this.devices.push({
            key: 'BACK',
            value: 'viewers.cameraBack',
          });
        }
      }

      this.loadStream();
    });
  }

  public loadStream(): void {
    this.peer = new Peer(uuidv4(), environment.peer as any);

    this.debugger.push(`deviceSelect=[${this.deviceSelect}]`);
    if (!this.monitor.id) {
      this.back();
    }

    const constraints: any = {
      audio: true,
      video: {
        facingMode: 'user',
      },
    };

    //if (event && event.target && event.target.value === 'BACK') {
    if (this.deviceSelect === 'BACK') {
      constraints.video = {
        facingMode: {
          exact: 'environment',
        },
      };
    }

    this.debugger.push(`constraints=[${JSON.stringify(constraints)}]`);

    if (this.streamLocal) {
      this.debugger.push(`has streamLocal=[${JSON.stringify(this.streamLocal)}]`);
      this.streamLocal.getTracks().forEach((track: any) => {
        this.debugger.push(`track=[${JSON.stringify(track)}]`);
        this.debugger.push(`track=[${track}]`);
        track.stop();
      });
    }

    this.debugger.push('mediaDevices.getUserMedia');
    navigator.mediaDevices.getUserMedia(constraints)
    .then((streamLocal: any) => {
      this.streamLocal = streamLocal;
      this.debugger.push(`streamLocal=[${JSON.stringify(this.streamLocal)}]`);

      this.peer.on('call', (call: any) => {
        this.debugger.push(`peer call=[${call}]`);
        call.answer(streamLocal);

        let video = document.getElementById('video');
        this.debugger.push(`call getElementById=[${JSON.stringify(video)}]`);

        if (!video) {
          video = document.createElement('video');
          video.setAttribute('id', 'video');
        }

        call.on('stream', (streamRemote: any) => {
          this.addStreamToVideo(streamRemote, video);
        });
      });

      this.socket.on('VIEW_CONNECT', (peerId: string) => {
        this.connectToPeer(peerId, streamLocal);
      });
    });

    this.peer.on('open', (peerId: any) => {
      this.debugger.push(`peer open=[${peerId}]`);
      this.socket.emit('VIEW_OPEN', this.monitor.id, this.user.id, peerId);
    });

    this.spinnerService.hide();
  }

  private addStreamToVideo(stream: any, video: any): void {
    this.debugger.push(`addStreamToVideo=[${JSON.stringify(video)}]`);
    this.waiting = false;

    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
      this.videos.append(video);
    });
  }

  private connectToPeer(peerId: string, stream: any): void {
    const call = this.peer.call(peerId, stream);

    let video = document.getElementById('video');

    this.debugger.push(`connectToPeer getElementById=[${JSON.stringify(video)}]`);

    if (!video) {
      video = document.createElement('video');
      video.setAttribute('id', 'video');
    }
    
    //const video = document.createElement('video');
    //video.setAttribute('id', 'video');


    call.on('stream', (streamRemote: any) => {
      this.addStreamToVideo(streamRemote, video);
    });
  }

  public toggleVideo(): void {
    this.showCamera = !this.showCamera;

    const videoOverlay: any = document.getElementById('video-overlay');

    if (this.showCamera) {
      videoOverlay.classList.remove('video-overlay');
    } else {
      videoOverlay.classList.add('video-overlay');
    }
  }

  public invite(): void {
    const modal = this.modalService.open(ViewersFormComponent, { backdrop: 'static', centered: true });
    modal.componentInstance.monitor = this.monitor;
  }

  public back(): void {
    this.router.navigate(['/monitors']);
  }

}

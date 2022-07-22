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
  videos: any;
  streamLocal: any;
  monitor: MonitorsModel;
  waiting: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private socket: Socket,
              private spinnerService: NgxSpinnerService,
              private storageService: StorageService,
              private viewersService: ViewersService) {
    this.peer = undefined;
    this.user = undefined;
    this.videos = undefined;
    this.streamLocal = undefined;
    this.monitor = new MonitorsModel();
    this.waiting = true;
  }

  ngAfterViewInit(): void {
    this.user = this.storageService.getUser();

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.monitor.id = params['id'];
      this.monitor.code = params['code'];
      this.monitor.name = params['name'];

      this.load();
    });
  }

  private load(): void {
    if (!this.monitor.id) {
      this.back();
    }

    this.peer = new Peer(uuidv4(), environment.peer as any);

    this.videos = document.getElementById('videos');

    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    }).then((streamLocal: any) => {
      this.streamLocal = streamLocal;

      this.peer.on('call', (call: any) => {
        call.answer(streamLocal);

        const videoRemote = document.createElement('video');

        call.on('stream', (streamRemote: any) => {
          this.addStreamToVideo(streamRemote, videoRemote);
        });
      });

      this.socket.on('VIEW_CONNECT', (peerId: string) => {
        this.connectToPeer(peerId, streamLocal);
      });
    });

    this.peer.on('open', (peerId: any) => {
      this.socket.emit('VIEW_OPEN', this.monitor.id, this.user.id, peerId);
    });

    this.spinnerService.hide();
  }

  private addStreamToVideo(stream: any, video: any): void {
    this.waiting = false;

    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
      this.videos.append(video);
    });
  }

  private connectToPeer(peerId: string, stream: any): void {
    const call = this.peer.call(peerId, stream);
    const video = document.createElement('video');
    call.on('stream', (streamRemote: any) => {
      this.addStreamToVideo(streamRemote, video);
    });
  }

  public invite(): void {
    const modal = this.modalService.open(ViewersFormComponent, { backdrop: 'static', centered: true });
    modal.componentInstance.monitor = this.monitor;
  }

  public back(): void {
    this.router.navigate(['/monitors']);
  }

}

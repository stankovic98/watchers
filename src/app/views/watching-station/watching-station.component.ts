import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/models';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-watching-station',
  templateUrl: './watching-station.component.html',
  styleUrls: ['./watching-station.component.scss'],
})
export class WatchingStationComponent implements OnInit {
  video: Video = {
    id: '',
    name: '',
    watched: false,
    endDate: new Date(),
    timestamps: [],
  };
  hidePopup = { lessions: true, done: true };

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id') || '';
      this.getSelectedVideo(id);
    });
  }

  async getSelectedVideo(id: string) {
    this.video = await this.videoService.getVideoByID(id);
  }

  toggleLessionsPopup(): void {
    this.hidePopup.lessions = !this.hidePopup.lessions;
    document.body.classList.toggle('my-body-noscroll-class');
  }
}

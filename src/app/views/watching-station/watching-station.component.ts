import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    themes: [],
  };
  hidePopup = { lessions: true, done: true };
  player: YT.Player;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  setVideoWatched() {
    this.video.watched = true;
    this.videoService
      .setVideoToWatched(this.video)
      .then(() => {
        console.log('all okey');
      })
      .catch((err) => console.log);
  }

  themeClicked(id: string) {
    let index = this.video.themes.findIndex((th) => th.id === id);
    this.video.themes[index].isClicked = !this.video.themes[index].isClicked;
    this.video.themes[index].userTimeStamp = this.player.getCurrentTime();
    // call API on done
    // this.videoService.themeClicked(
    //   this.video.id,
    //   id,
    //   this.player.getCurrentTime()
    // );
  }

  setYTPlayer(player: any) {
    this.player = player;
  }

  toggleLessionsPopup(): void {
    this.hidePopup.lessions = !this.hidePopup.lessions;
    document.body.classList.toggle('my-body-noscroll-class');
  }

  toggleDonePopup(): void {
    this.hidePopup.done = !this.hidePopup.done;
    document.body.classList.toggle('my-body-noscroll-class');
  }

  goToHomePage(): void {
    document.body.classList.toggle('my-body-noscroll-class');
    this.router.navigate(['/']);
  }
}

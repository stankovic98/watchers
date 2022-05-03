import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-yt-player',
  templateUrl: './yt-player.component.html',
  styleUrls: ['./yt-player.component.scss'],
})
export class YtPlayerComponent implements AfterViewInit {
  @Input('videoID') videoID: string;
  @Output('videoWatched') videoWatched: EventEmitter<any> = new EventEmitter();

  @ViewChild('youTubePlayerContainer')
  ytPlayerContainer: ElementRef<HTMLDivElement>;
  customPlayerVars: YT.PlayerVars = {
    modestbranding: 1,
    rel: 0,
  };

  watchTime = {
    percentageWatched: Array.from({ length: 100 }, (v, i) => -i),
    start: 0,
    secondsToPercentage: 0,
    percentageStart: 0,
  };
  videoHeight: number | undefined;
  videoWidth: number | undefined;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
    let savedWatchTime = localStorage.getItem('WATCH_TIME');
    if (savedWatchTime) {
      console.log('imamo watch time', savedWatchTime);
      this.watchTime.percentageWatched = JSON.parse(savedWatchTime);
    }
  }

  onResize(): void {
    this.videoWidth = Math.min(
      this.ytPlayerContainer.nativeElement.clientWidth,
      1200
    );
    this.videoHeight = this.videoWidth * 0.6;
    this.changeDetectorRef.detectChanges();
  }

  stateHasChanged(onStateChange: YT.OnStateChangeEvent) {
    let player = onStateChange.target;
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      this.watchTime.start = player.getCurrentTime();
      this.watchTime.percentageStart =
        player.getCurrentTime() / player.getDuration();
    } else {
      let timePassed = player.getCurrentTime() - this.watchTime.start;
      if (timePassed > player.getDuration()) {
        timePassed = 0;
      }
      let percentagePassed = timePassed / player.getDuration();
      this.changePerOfWatchedVideo(
        this.watchTime.percentageStart,
        percentagePassed
      );
    }
  }

  changePerOfWatchedVideo(perStart: number, perDuration: number) {
    perStart = Math.floor(perStart * 100);
    perDuration = Math.floor(perDuration * 100);
    console.log(perStart, perDuration);
    for (let i = perStart; i < perStart + perDuration; i++) {
      this.watchTime.percentageWatched[i] *= -1;
    }
    localStorage.setItem(
      'WATCH_TIME',
      JSON.stringify(this.watchTime.percentageWatched)
    );
    this.checkWatchedTime();
    console.log(this.watchTime.percentageWatched);
  }

  checkWatchedTime() {
    let perWatched = this.watchTime.percentageWatched.filter(
      (per) => per > 0
    ).length;

    if (perWatched > 80) {
      this.videoWatched.emit();
    }
  }
}

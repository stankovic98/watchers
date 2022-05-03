import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewRef,
} from '@angular/core';
import { throwIfEmpty } from 'rxjs';

@Component({
  selector: 'app-yt-player',
  templateUrl: './yt-player.component.html',
  styleUrls: ['./yt-player.component.scss'],
})
export class YtPlayerComponent implements AfterViewInit {
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

  @Input('videoID') videoID: string;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
    console.log(this.watchTime.percentageWatched);
  }

  onResize(): void {
    this.videoWidth = Math.min(
      this.ytPlayerContainer.nativeElement.clientWidth,
      1200
    );
    this.videoHeight = this.videoWidth * 0.6;
    this.changeDetectorRef.detectChanges();
  }

  initWatchTime(e: YT.PlayerEvent) {
    this.watchTime.secondsToPercentage = e.target.getDuration() / 100;
  }

  stateHasChanged(onStateChange: YT.OnStateChangeEvent) {
    let player = onStateChange.target;
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      this.watchTime.start = new Date().getTime();
      this.watchTime.percentageStart =
        player.getCurrentTime() / player.getDuration();
    } else {
      let timePassed = (new Date().getTime() - this.watchTime.start) / 1000;
      if (timePassed > player.getDuration()) {
        timePassed = 0;
      }
      let percentagePassed = timePassed / player.getDuration();
      // console.log('time passed: ', timePassed);
      // console.log('percentage passed: ', percentagePassed);
      // console.log('percentage start: ', this.watchTime.percentageStart);
      this.changePercentageOfWatchedVideo(
        this.watchTime.percentageStart,
        percentagePassed
      );
    }

    console.log('--------------------------------');
  }

  changePercentageOfWatchedVideo(perStart: number, perDuration: number) {
    perStart = Math.floor(perStart * 100);
    perDuration = Math.floor(perDuration * 100);
    console.log(perStart, perDuration);
    for (let i = perStart; i < perStart + perDuration; i++) {
      this.watchTime.percentageWatched[i] *= -1;
    }
    console.log(this.watchTime.percentageWatched);
  }
}

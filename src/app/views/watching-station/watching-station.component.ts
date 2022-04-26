import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/models';

@Component({
  selector: 'app-watching-station',
  templateUrl: './watching-station.component.html',
  styleUrls: ['./watching-station.component.scss']
})
export class WatchingStationComponent implements OnInit, AfterViewInit {
  @ViewChild('youTubePlayer') youTubePlayer: ElementRef<HTMLDivElement>;
  video: Video = {id: "", name: "", watched: false, endDate: new Date()}
  videoHeight: number | undefined;
  videoWidth: number | undefined;


  constructor(private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.video.id = params.get('id') || '';
      this.video.name = params.get('name') || '';
      this.video.watched = Boolean(params.get('watched')) || false;
      this.video.endDate = new Date(params.get('endDate') || '');
      console.log(this.video)
    })
  }

  ngAfterViewInit(): void {
    console.log(this.youTubePlayer.nativeElement.clientWidth)
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    console.log(this.youTubePlayer.nativeElement.clientWidth)
    this.videoWidth = Math.min(this.youTubePlayer.nativeElement.clientWidth, 1200);
    this.videoHeight = this.videoWidth * 0.6;
    this.changeDetectorRef.detectChanges();
  }
}

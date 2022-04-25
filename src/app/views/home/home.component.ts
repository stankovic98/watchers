import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mustWatchVids: Video[] = [];
  constructor(private videosService: VideoService) {}

  ngOnInit(): void {
    console.log(this.videosService.getThisWeekVideos());
    this.mustWatchVids = this.videosService.getThisWeekVideos();
  }
}

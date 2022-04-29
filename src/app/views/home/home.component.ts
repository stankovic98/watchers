import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchWord: string = '';
  mustWatchVids: Video[] = [];
  allVideos: Video[] = [];
  filteredVideos: Video[] = [];

  constructor(private videosService: VideoService) {}

  ngOnInit(): void {
    this.videosService.getVideos().then((res) => {
      this.allVideos = res;
      this.filteredVideos = this.allVideos;
      this.mustWatchVids = this.filterMustWatchVideos(this.allVideos);
    });
  }

  filterMustWatchVideos(videos: Video[]): Video[] {
    let sevenDays = new Date();
    sevenDays.setDate(sevenDays.getDate() + 7);
    return videos.filter(
      (vid) => vid.endDate.getTime() - sevenDays.getTime() < 0
    );
  }

  filterBySearchWord() {
    console.log(this.searchWord);
    this.filteredVideos = this.allVideos.filter((vid) =>
      vid.name.toLowerCase().includes(this.searchWord.trim().toLowerCase())
    );
  }
}

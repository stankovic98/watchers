import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  url: string = 'http://localhost:3000/';
  allVideos: Video[] = [];
  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    this.http.get<Video[]>(this.url + 'videos').subscribe((videos) => {
      this.allVideos = videos;
    });
  }

  getThisWeekVideos(): Video[] {
    let sevenDays = new Date();
    sevenDays.setDate(sevenDays.getDate() + 7);

    return this.allVideos.filter((vid) => {
      return vid.endDate.getTime() < sevenDays.getTime();
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Video } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  url: string = 'http://localhost:3000/';
  allVideos: Video[];

  constructor(private http: HttpClient) {}

  async getVideos() {
    let videos = await firstValueFrom(
      this.http.get<Video[]>(this.url + 'videos')
    );
    this.allVideos = videos.map((v) => {
      return {
        id: v.id,
        name: v.name,
        watched: v.watched,
        endDate: new Date(v.endDate),
        timestamps: v.timestamps,
      };
    });
    return this.allVideos;
  }
}

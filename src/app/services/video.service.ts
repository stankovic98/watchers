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
        themes: v.themes,
      };
    });
    return this.allVideos;
  }

  getVideoByID(id: string): Video | Promise<Video> {
    let emptyVid: Video = {
      id: '',
      name: '',
      watched: false,
      endDate: new Date(),
      themes: [],
    };
    if (!this.allVideos) {
      return this.getVideos().then((videos) => {
        return videos.find((vid) => vid.id == id) || emptyVid;
      });
    }
    return this.allVideos.find((vid) => vid.id == id) || emptyVid;
  }

  themeClicked(vidID: string, themeID: string, time: number) {
    // call backend
  }

  async setVideoToWatched(video: Video): Promise<boolean> {
    return await true;
    // return await firstValueFrom(
    //   this.http.put(this.url + 'videos/' + video.id, { ...video })
    // );
  }
}

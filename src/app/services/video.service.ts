import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getVideos() {
    return this.http.get<Video[]>(this.url + 'videos');
  }
}

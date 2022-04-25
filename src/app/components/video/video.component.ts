import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/models';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  @Input('video') video: Video = {
    id: '',
    name: '',
    watched: false,
    endDate: new Date(),
  };

  constructor() {}

  ngOnInit(): void {}
}

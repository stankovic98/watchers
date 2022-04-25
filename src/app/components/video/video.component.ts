import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/models/models';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  animations: [
    trigger('apearAndExit', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class VideoComponent implements OnInit {
  @HostBinding('@apearAndExit')
  @Input('video')
  video: Video = {
    id: '',
    name: '',
    watched: false,
    endDate: new Date(),
  };

  constructor() {}

  ngOnInit(): void {}
}

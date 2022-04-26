import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/models';

@Component({
  selector: 'app-watching-station',
  templateUrl: './watching-station.component.html',
  styleUrls: ['./watching-station.component.scss']
})
export class WatchingStationComponent implements OnInit {
  video: Video = {id: "", name: "", watched: false, endDate: new Date()}
 
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.video.id = params.get('id') || '';
      this.video.name = params.get('name') || '';
      this.video.watched = Boolean(params.get('watched')) || false;
      this.video.endDate = new Date(params.get('endDate') || '');
      console.log(this.video)
    })
  }
}

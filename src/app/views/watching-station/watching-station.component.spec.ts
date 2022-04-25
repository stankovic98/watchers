import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchingStationComponent } from './watching-station.component';

describe('WatchingStationComponent', () => {
  let component: WatchingStationComponent;
  let fixture: ComponentFixture<WatchingStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchingStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchingStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { WatchingStationComponent } from './views/watching-station/watching-station.component';
import { VideoService } from './services/video.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WatchingStationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [VideoService],
  bootstrap: [AppComponent],
})
export class AppModule {}

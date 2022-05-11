import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { WatchingStationComponent } from './views/watching-station/watching-station.component';
import { VideoService } from './services/video.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoComponent } from './components/video/video.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YtPlayerComponent } from './components/yt-player/yt-player.component';
import { PopupComponent } from './components/popup/popup.component';
import { AuthComponent } from './views/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptor } from './auth/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WatchingStationComponent,
    VideoComponent,
    YtPlayerComponent,
    PopupComponent,
    AuthComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    YouTubePlayerModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    VideoService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

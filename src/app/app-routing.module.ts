import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from './guards/user-auth.guard';
import { AuthComponent } from './views/auth/auth.component';
import { HomeComponent } from './views/home/home.component';
import { WatchingStationComponent } from './views/watching-station/watching-station.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'watch/:id',
    component: WatchingStationComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from './auth/user-auth.guard';
import { AuthComponent } from './views/auth/auth.component';
import { ClassComponent } from './views/class/class.component';
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
    path: 'class',
    component: ClassComponent,
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

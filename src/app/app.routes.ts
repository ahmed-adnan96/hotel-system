import { Routes } from '@angular/router';
import { LayoutComponent } from './feature/shared/components/layout/layout.component';
import { HomeComponent } from './feature/shared/components/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { ProfileComponent } from './feature/shared/components/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'Profile', component: ProfileComponent },

      {
        path: 'facilities',
        loadChildren: () =>
          import('./feature/facilities/facilities.module').then(
            (m) => m.FacilitiesModule
          ),
      },
      {
        path: 'room',
        loadChildren: () =>
          import('./feature/room/room.module').then((m) => m.RoomModule),
      },
      {
        path: 'ads',
        loadChildren: () =>
          import('./feature/ads/ads.module').then((m) => m.AdsModule),
      },
      {
        path: 'booking',
        loadComponent: () =>
          import('./feature/stanaloneComponents/booking/booking.component').then((m) => m.BookingComponent),
      },
      {
        path: 'userList',
        loadComponent: () =>
          import('./feature/stanaloneComponents/user-list/user-list.component').then((m) => m.UserListComponent),
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./feature/shared/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];


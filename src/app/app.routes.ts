import { Routes } from '@angular/router';
import { LayoutComponent } from './feature/shared/components/layout/layout.component';
import { HomeComponent } from './feature/shared/components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {path:'dashboard',component:LayoutComponent ,children:[
    {path:'' ,redirectTo:'home' ,pathMatch:'full'},
    {path:'home',component:HomeComponent},
  {
    path: 'facilities',
    loadChildren: () =>
      import('./feature/facilities/facilities.module').then((mod) => mod.FacilitiesModule),
  },
  ]},


  {
    path: '**',
    loadComponent: () =>
      import('./feature/shared/components/not-found/not-found.component').then(
        (mod) => mod.NotFoundComponent
      ),
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./feature/shared/components/not-found/not-found.component').then(
        (mod) => mod.NotFoundComponent
      ),
  },
];

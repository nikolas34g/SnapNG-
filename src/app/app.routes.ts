import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./photos/photos.component').then((m) => m.PhotosComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then((m) => m.FavoritesComponent),
  },
  {
    path: 'photos/:id',
    loadComponent: () =>
      import('./single-photo/single-photo.component').then((m) => m.SinglePhotoComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent),
  },
];

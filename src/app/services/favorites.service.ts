import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: {url: string, id: string}[] = [];

  constructor() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  addFavorite(photoUrl: string, photoId: string) {
    if (!this.favorites.some(fav => fav.id === photoId)) {
      this.favorites.push({url: photoUrl, id: photoId});
      this.saveFavorites();
    }
  }

  removeFavorite(photoId: string) {
    this.favorites = this.favorites.filter((fav) => fav.id !== photoId);
    this.saveFavorites();
  }

  getFavorites() {
    return [...this.favorites]; 
  }

  private saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

}
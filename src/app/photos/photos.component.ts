import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FavoritesService } from '../services/favorites.service';
import { InfiniteScrollDirective } from '../directives/infinite-scroll.directive'; 

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, InfiniteScrollDirective],
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  photos: { url: string; id: string }[] = [];
  isLoading = false;
  message: string | null = null;

  private readonly favoritesService = inject(FavoritesService);

  ngOnInit() {
    this.loadPhotos(9);
  }

  loadPhotos(count: number): void {
    this.isLoading = true;
    const delay = Math.floor(Math.random() * 100) + 200;

    setTimeout(() => {
      for (let i = 0; i < count; i++) {
        this.photos.push(this.getRandomPhotoUrl());
      }
      this.isLoading = false;
    }, delay);
  }

  getRandomPhotoUrl(): { url: string; id: string } {
    let id = Math.floor(Math.random() * 100) + 1;
    if (id === 86) id = 87;
    if (id === 97) id = 98;

    return {
      url: `https://picsum.photos/id/${id}/1200/800`,
      id: id.toString()
    };
  }

  addToFavorites(photo: { url: string; id: string }) {
    this.favoritesService.addFavorite(photo.url, photo.id);
    this.message = 'Added to favorites!';
    setTimeout(() => (this.message = null), 2000);
  }

  onScrollTriggered(): void {
    if (!this.isLoading) {
      this.loadPhotos(3);
    }
  }
}

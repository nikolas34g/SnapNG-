import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
})
export class SinglePhotoComponent implements OnInit {
  photoUrl: string | null = null;
  photoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const favorites = this.favoritesService.getFavorites();
      const photo = favorites.find(fav => fav.id === id);
      
      if (photo) {
        this.photoUrl = photo.url;
        this.photoId = photo.id;
      } else {
        this.router.navigate(['/favorites']);
      }
    }
  }

  removeFromFavorites() {
    if (this.photoId) {
      this.favoritesService.removeFavorite(this.photoId);
      this.router.navigate(['/favorites']);
    }
  }
}
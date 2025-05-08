import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../services/favorites.service'; 

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: {url: string, id: string}[] = []; 

  constructor(private favoritesService: FavoritesService, private router: Router) {}

  ngOnInit() {
    this.favorites = this.favoritesService.getFavorites();
  }

  viewSinglePhoto(photoId: string) {
    this.router.navigate(['/photos', photoId]);
  }


}
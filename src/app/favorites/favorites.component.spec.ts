import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from '../services/favorites.service';
import { Router } from '@angular/router';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  const mockFavorites = [
    { id: '1', url: 'http://example.com/1.jpg' },
    { id: '2', url: 'http://example.com/2.jpg' }
  ];

  const mockFavoritesService = {
    getFavorites: () => mockFavorites
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [
        { provide: FavoritesService, useValue: mockFavoritesService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites on init', () => {
    expect(component.favorites.length).toBe(2);
    expect(component.favorites).toEqual(mockFavorites);
  });

  it('should navigate to single photo view', () => {
    component.viewSinglePhoto('1');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/photos', '1']);
  });
});

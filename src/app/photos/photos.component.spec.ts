import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PhotosComponent } from './photos.component';
import { FavoritesService } from '../services/favorites.service';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  const mockFavoritesService = {
    addFavorite: jasmine.createSpy('addFavorite')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosComponent],
      providers: [{ provide: FavoritesService, useValue: mockFavoritesService }]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load photos on init', fakeAsync(() => {
    expect(component.photos.length).toBe(0);
    component.ngOnInit();
    tick(300); 
    expect(component.photos.length).toBeGreaterThan(0);
  }));

  it('should add a photo to favorites', fakeAsync(() => {
    const photo = { url: 'https://test.url', id: '123' };
    component.addToFavorites(photo);

    expect(mockFavoritesService.addFavorite).toHaveBeenCalledWith(photo.url, photo.id);
    expect(component.message).toBe('Added to favorites!');

    tick(2000);
    expect(component.message).toBeNull();
  }));

  it('should set isLoading correctly when loading photos', fakeAsync(() => {
    component.loadPhotos(2);
    expect(component.isLoading).toBeTrue();

    tick(300);
    expect(component.isLoading).toBeFalse();
  }));
});

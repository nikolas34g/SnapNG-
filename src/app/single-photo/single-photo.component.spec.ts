import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinglePhotoComponent } from './single-photo.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

describe('SinglePhotoComponent', () => {
  let component: SinglePhotoComponent;
  let fixture: ComponentFixture<SinglePhotoComponent>;

  const favorites = [
    { id: '1', url: 'http://example.com/photo1.jpg' },
    { id: '2', url: 'http://example.com/photo2.jpg' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePhotoComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: FavoritesService, useValue: {
          getFavorites: () => favorites,
          removeFavorite: jasmine.createSpy('removeFavorite')
        }},
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SinglePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the correct photo', () => {
    expect(component.photoUrl).toBe('http://example.com/photo1.jpg');
    expect(component.photoId).toBe('1');
  });

  it('should navigate away if photo not found', () => {
    const route = TestBed.inject(ActivatedRoute);
    const router = TestBed.inject(Router);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('999');

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/favorites']);
  });

  it('should remove photo and navigate away', () => {
    const service = TestBed.inject(FavoritesService);
    const router = TestBed.inject(Router);

    component.photoId = '1';
    component.removeFromFavorites();

    expect(service.removeFavorite).toHaveBeenCalledWith('1');
    expect(router.navigate).toHaveBeenCalledWith(['/favorites']);
  });
});

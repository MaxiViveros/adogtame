import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselMascotasComponent } from './carousel-mascotas.component';

describe('CarouselMascotasComponent', () => {
  let component: CarouselMascotasComponent;
  let fixture: ComponentFixture<CarouselMascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselMascotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

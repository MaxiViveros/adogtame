import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsCarouselHomeComponent } from './steps-carousel-home.component';

describe('StepsCarouselHomeComponent', () => {
  let component: StepsCarouselHomeComponent;
  let fixture: ComponentFixture<StepsCarouselHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsCarouselHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsCarouselHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

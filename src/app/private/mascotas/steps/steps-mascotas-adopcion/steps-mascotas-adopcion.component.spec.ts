import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsMascotasAdopcionComponent } from './steps-mascotas-adopcion.component';

describe('StepsMascotasAdopcionComponent', () => {
  let component: StepsMascotasAdopcionComponent;
  let fixture: ComponentFixture<StepsMascotasAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsMascotasAdopcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsMascotasAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

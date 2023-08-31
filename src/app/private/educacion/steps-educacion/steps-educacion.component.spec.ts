import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsEducacionComponent } from './steps-educacion.component';

describe('StepsEducacionComponent', () => {
  let component: StepsEducacionComponent;
  let fixture: ComponentFixture<StepsEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsEducacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

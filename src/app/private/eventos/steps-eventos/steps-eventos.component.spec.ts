import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsEventosComponent } from './steps-eventos.component';

describe('StepsEventosComponent', () => {
  let component: StepsEventosComponent;
  let fixture: ComponentFixture<StepsEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

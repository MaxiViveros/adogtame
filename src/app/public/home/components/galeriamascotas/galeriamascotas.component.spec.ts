import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriamascotasComponent } from './galeriamascotas.component';

describe('GaleriamascotasComponent', () => {
  let component: GaleriamascotasComponent;
  let fixture: ComponentFixture<GaleriamascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriamascotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriamascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

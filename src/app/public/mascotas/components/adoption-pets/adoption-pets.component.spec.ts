import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionPetsComponent } from './adoption-pets.component';

describe('AdoptionPetsComponent', () => {
  let component: AdoptionPetsComponent;
  let fixture: ComponentFixture<AdoptionPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptionPetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

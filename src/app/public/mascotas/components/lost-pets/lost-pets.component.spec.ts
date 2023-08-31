import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPetsComponent } from './lost-pets.component';

describe('LostPetsComponent', () => {
  let component: LostPetsComponent;
  let fixture: ComponentFixture<LostPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostPetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

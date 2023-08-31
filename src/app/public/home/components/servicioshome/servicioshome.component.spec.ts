import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioshomeComponent } from './servicioshome.component';

describe('ServicioshomeComponent', () => {
  let component: ServicioshomeComponent;
  let fixture: ComponentFixture<ServicioshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioshomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

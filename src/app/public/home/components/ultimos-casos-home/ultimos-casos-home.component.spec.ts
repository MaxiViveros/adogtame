import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimosCasosHomeComponent } from './ultimos-casos-home.component';

describe('UltimosCasosHomeComponent', () => {
  let component: UltimosCasosHomeComponent;
  let fixture: ComponentFixture<UltimosCasosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimosCasosHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimosCasosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

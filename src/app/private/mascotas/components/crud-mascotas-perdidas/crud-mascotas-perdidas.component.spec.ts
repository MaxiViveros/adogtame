import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMascotasPerdidasComponent } from './crud-mascotas-perdidas.component';

describe('CrudMascotasPerdidasComponent', () => {
  let component: CrudMascotasPerdidasComponent;
  let fixture: ComponentFixture<CrudMascotasPerdidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudMascotasPerdidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudMascotasPerdidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

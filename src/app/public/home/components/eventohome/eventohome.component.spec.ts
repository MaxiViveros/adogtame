import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventohomeComponent } from './eventohome.component';

describe('EventohomeComponent', () => {
  let component: EventohomeComponent;
  let fixture: ComponentFixture<EventohomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventohomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventohomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageheaderComponent } from './imageheader.component';

describe('ImageheaderComponent', () => {
  let component: ImageheaderComponent;
  let fixture: ComponentFixture<ImageheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

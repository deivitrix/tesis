import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisioninformacionComponent } from './visioninformacion.component';

describe('VisioninformacionComponent', () => {
  let component: VisioninformacionComponent;
  let fixture: ComponentFixture<VisioninformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisioninformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisioninformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

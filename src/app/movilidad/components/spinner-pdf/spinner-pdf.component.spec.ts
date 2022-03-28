import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerPDFComponent } from './spinner-pdf.component';

describe('SpinnerPDFComponent', () => {
  let component: SpinnerPDFComponent;
  let fixture: ComponentFixture<SpinnerPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerPDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

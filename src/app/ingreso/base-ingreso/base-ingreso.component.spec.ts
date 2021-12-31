import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseIngresoComponent } from './base-ingreso.component';

describe('BaseIngresoComponent', () => {
  let component: BaseIngresoComponent;
  let fixture: ComponentFixture<BaseIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseIngresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

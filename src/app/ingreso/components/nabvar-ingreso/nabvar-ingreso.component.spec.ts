import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabvarIngresoComponent } from './nabvar-ingreso.component';

describe('NabvarIngresoComponent', () => {
  let component: NabvarIngresoComponent;
  let fixture: ComponentFixture<NabvarIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NabvarIngresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NabvarIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

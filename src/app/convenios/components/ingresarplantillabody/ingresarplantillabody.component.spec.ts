import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarplantillabodyComponent } from './ingresarplantillabody.component';

describe('IngresarplantillabodyComponent', () => {
  let component: IngresarplantillabodyComponent;
  let fixture: ComponentFixture<IngresarplantillabodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarplantillabodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarplantillabodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

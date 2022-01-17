import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarfirmaComponent } from './ingresarfirma.component';

describe('IngresarfirmaComponent', () => {
  let component: IngresarfirmaComponent;
  let fixture: ComponentFixture<IngresarfirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarfirmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarfirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarfirmaemisorComponent } from './ingresarfirmaemisor.component';

describe('IngresarfirmaemisorComponent', () => {
  let component: IngresarfirmaemisorComponent;
  let fixture: ComponentFixture<IngresarfirmaemisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarfirmaemisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarfirmaemisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

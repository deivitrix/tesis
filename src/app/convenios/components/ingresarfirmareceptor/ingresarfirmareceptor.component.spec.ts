import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarfirmareceptorComponent } from './ingresarfirmareceptor.component';

describe('IngresarfirmareceptorComponent', () => {
  let component: IngresarfirmareceptorComponent;
  let fixture: ComponentFixture<IngresarfirmareceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarfirmareceptorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarfirmareceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

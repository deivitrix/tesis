import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarclausulaComponent } from './ingresarclausula.component';

describe('IngresarclausulaComponent', () => {
  let component: IngresarclausulaComponent;
  let fixture: ComponentFixture<IngresarclausulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarclausulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarclausulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

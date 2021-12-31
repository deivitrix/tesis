import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarconveniosBodyComponent } from './ingresarconvenios-body.component';

describe('IngresarconveniosBodyComponent', () => {
  let component: IngresarconveniosBodyComponent;
  let fixture: ComponentFixture<IngresarconveniosBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarconveniosBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarconveniosBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

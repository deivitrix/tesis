import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarbecasComponent } from './ingresarbecas.component';

describe('IngresarbecasComponent', () => {
  let component: IngresarbecasComponent;
  let fixture: ComponentFixture<IngresarbecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarbecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarbecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

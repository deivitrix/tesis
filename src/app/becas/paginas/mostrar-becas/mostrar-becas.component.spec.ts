import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarBecasComponent } from './mostrar-becas.component';

describe('MostrarBecasComponent', () => {
  let component: MostrarBecasComponent;
  let fixture: ComponentFixture<MostrarBecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarBecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarBecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

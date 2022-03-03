import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovilidadInformacionComponent } from './movilidad-informacion.component';

describe('MovilidadInformacionComponent', () => {
  let component: MovilidadInformacionComponent;
  let fixture: ComponentFixture<MovilidadInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovilidadInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovilidadInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaInterfazComponent } from './galeria-interfaz.component';

describe('GaleriaInterfazComponent', () => {
  let component: GaleriaInterfazComponent;
  let fixture: ComponentFixture<GaleriaInterfazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaInterfazComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriaInterfazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navb2InicioComponent } from './navb2-inicio.component';

describe('Navb2InicioComponent', () => {
  let component: Navb2InicioComponent;
  let fixture: ComponentFixture<Navb2InicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Navb2InicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Navb2InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

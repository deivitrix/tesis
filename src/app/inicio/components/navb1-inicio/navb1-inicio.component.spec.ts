import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navb1InicioComponent } from './navb1-inicio.component';

describe('Navb1InicioComponent', () => {
  let component: Navb1InicioComponent;
  let fixture: ComponentFixture<Navb1InicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Navb1InicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Navb1InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

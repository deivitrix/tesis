import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarconfiguracionavanzadaComponent } from './navbarconfiguracionavanzada.component';

describe('NavbarconfiguracionavanzadaComponent', () => {
  let component: NavbarconfiguracionavanzadaComponent;
  let fixture: ComponentFixture<NavbarconfiguracionavanzadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarconfiguracionavanzadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarconfiguracionavanzadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

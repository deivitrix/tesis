import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarconfiguracionComponent } from './navbarconfiguracion.component';

describe('NavbarconfiguracionComponent', () => {
  let component: NavbarconfiguracionComponent;
  let fixture: ComponentFixture<NavbarconfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarconfiguracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarconfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

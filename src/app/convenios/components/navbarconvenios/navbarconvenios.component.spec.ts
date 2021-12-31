import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarconveniosComponent } from './navbarconvenios.component';

describe('NavbarconveniosComponent', () => {
  let component: NavbarconveniosComponent;
  let fixture: ComponentFixture<NavbarconveniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarconveniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarconveniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

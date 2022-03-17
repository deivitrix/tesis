import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarbecasComponent } from './navbarbecas.component';

describe('NavbarbecasComponent', () => {
  let component: NavbarbecasComponent;
  let fixture: ComponentFixture<NavbarbecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarbecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarbecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

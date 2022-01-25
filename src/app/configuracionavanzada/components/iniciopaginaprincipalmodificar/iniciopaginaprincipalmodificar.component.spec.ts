import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciopaginaprincipalmodificarComponent } from './iniciopaginaprincipalmodificar.component';

describe('IniciopaginaprincipalmodificarComponent', () => {
  let component: IniciopaginaprincipalmodificarComponent;
  let fixture: ComponentFixture<IniciopaginaprincipalmodificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciopaginaprincipalmodificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciopaginaprincipalmodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

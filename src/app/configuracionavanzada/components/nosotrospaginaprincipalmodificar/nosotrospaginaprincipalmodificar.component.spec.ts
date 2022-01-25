import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosotrospaginaprincipalmodificarComponent } from './nosotrospaginaprincipalmodificar.component';

describe('NosotrospaginaprincipalmodificarComponent', () => {
  let component: NosotrospaginaprincipalmodificarComponent;
  let fixture: ComponentFixture<NosotrospaginaprincipalmodificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NosotrospaginaprincipalmodificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NosotrospaginaprincipalmodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

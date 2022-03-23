import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosDricbComponent } from './usuarios-dricb.component';

describe('UsuariosDricbComponent', () => {
  let component: UsuariosDricbComponent;
  let fixture: ComponentFixture<UsuariosDricbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosDricbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosDricbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

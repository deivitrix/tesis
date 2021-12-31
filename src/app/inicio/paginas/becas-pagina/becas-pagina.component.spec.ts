import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecasPaginaComponent } from './becas-pagina.component';

describe('BecasPaginaComponent', () => {
  let component: BecasPaginaComponent;
  let fixture: ComponentFixture<BecasPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecasPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecasPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

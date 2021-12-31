import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveniosPaginaComponent } from './convenios-pagina.component';

describe('ConveniosPaginaComponent', () => {
  let component: ConveniosPaginaComponent;
  let fixture: ComponentFixture<ConveniosPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveniosPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConveniosPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

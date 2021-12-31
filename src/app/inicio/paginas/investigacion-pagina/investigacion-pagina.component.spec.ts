import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigacionPaginaComponent } from './investigacion-pagina.component';

describe('InvestigacionPaginaComponent', () => {
  let component: InvestigacionPaginaComponent;
  let fixture: ComponentFixture<InvestigacionPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestigacionPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigacionPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

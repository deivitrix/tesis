import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoradoPaginaComponent } from './doctorado-pagina.component';

describe('DoctoradoPaginaComponent', () => {
  let component: DoctoradoPaginaComponent;
  let fixture: ComponentFixture<DoctoradoPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctoradoPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctoradoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarConvenioPDFComponent } from './mostrar-convenio-pdf.component';

describe('MostrarConvenioPDFComponent', () => {
  let component: MostrarConvenioPDFComponent;
  let fixture: ComponentFixture<MostrarConvenioPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarConvenioPDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarConvenioPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

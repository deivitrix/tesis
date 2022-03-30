import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirDocumentoFinalBecasComponent } from './subir-documento-final-becas.component';

describe('SubirDocumentoFinalBecasComponent', () => {
  let component: SubirDocumentoFinalBecasComponent;
  let fixture: ComponentFixture<SubirDocumentoFinalBecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirDocumentoFinalBecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirDocumentoFinalBecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

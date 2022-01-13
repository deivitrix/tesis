import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarreporteconvenioComponent } from './generarreporteconvenio.component';

describe('GenerarreporteconvenioComponent', () => {
  let component: GenerarreporteconvenioComponent;
  let fixture: ComponentFixture<GenerarreporteconvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarreporteconvenioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarreporteconvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

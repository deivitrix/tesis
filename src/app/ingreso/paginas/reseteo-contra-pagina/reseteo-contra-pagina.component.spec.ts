import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseteoContraPaginaComponent } from './reseteo-contra-pagina.component';

describe('ReseteoContraPaginaComponent', () => {
  let component: ReseteoContraPaginaComponent;
  let fixture: ComponentFixture<ReseteoContraPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseteoContraPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseteoContraPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

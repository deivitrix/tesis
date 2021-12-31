import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosotrosPaginaComponent } from './nosotros-pagina.component';

describe('NosotrosPaginaComponent', () => {
  let component: NosotrosPaginaComponent;
  let fixture: ComponentFixture<NosotrosPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NosotrosPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NosotrosPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregradoPaginaComponent } from './pregrado-pagina.component';

describe('PregradoPaginaComponent', () => {
  let component: PregradoPaginaComponent;
  let fixture: ComponentFixture<PregradoPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregradoPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregradoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

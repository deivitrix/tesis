import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestriaPaginaComponent } from './maestria-pagina.component';

describe('MaestriaPaginaComponent', () => {
  let component: MaestriaPaginaComponent;
  let fixture: ComponentFixture<MaestriaPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestriaPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestriaPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

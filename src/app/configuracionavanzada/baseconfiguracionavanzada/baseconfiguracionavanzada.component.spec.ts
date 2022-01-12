import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseconfiguracionavanzadaComponent } from './baseconfiguracionavanzada.component';

describe('BaseconfiguracionavanzadaComponent', () => {
  let component: BaseconfiguracionavanzadaComponent;
  let fixture: ComponentFixture<BaseconfiguracionavanzadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseconfiguracionavanzadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseconfiguracionavanzadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

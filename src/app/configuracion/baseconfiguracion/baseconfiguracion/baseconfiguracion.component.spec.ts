import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseconfiguracionComponent } from './baseconfiguracion.component';

describe('BaseconfiguracionComponent', () => {
  let component: BaseconfiguracionComponent;
  let fixture: ComponentFixture<BaseconfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseconfiguracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseconfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

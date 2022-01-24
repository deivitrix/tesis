import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingconfiguracionavanzadaComponent } from './loadingconfiguracionavanzada.component';

describe('LoadingconfiguracionavanzadaComponent', () => {
  let component: LoadingconfiguracionavanzadaComponent;
  let fixture: ComponentFixture<LoadingconfiguracionavanzadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingconfiguracionavanzadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingconfiguracionavanzadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

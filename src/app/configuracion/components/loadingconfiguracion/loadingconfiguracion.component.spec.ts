import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingconfiguracionComponent } from './loadingconfiguracion.component';

describe('LoadingconfiguracionComponent', () => {
  let component: LoadingconfiguracionComponent;
  let fixture: ComponentFixture<LoadingconfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingconfiguracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingconfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

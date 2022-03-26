import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingmovilidadComponent } from './loadingmovilidad.component';

describe('LoadingmovilidadComponent', () => {
  let component: LoadingmovilidadComponent;
  let fixture: ComponentFixture<LoadingmovilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingmovilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingmovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

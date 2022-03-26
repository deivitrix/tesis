import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablamostrarmovilidadComponent } from './tablamostrarmovilidad.component';

describe('TablamostrarmovilidadComponent', () => {
  let component: TablamostrarmovilidadComponent;
  let fixture: ComponentFixture<TablamostrarmovilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablamostrarmovilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablamostrarmovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

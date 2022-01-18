import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablamodificarComponent } from './tablamodificar.component';

describe('TablamodificarComponent', () => {
  let component: TablamodificarComponent;
  let fixture: ComponentFixture<TablamodificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablamodificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablamodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

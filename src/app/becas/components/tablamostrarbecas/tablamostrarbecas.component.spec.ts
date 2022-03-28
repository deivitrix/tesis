import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablamostrarbecasComponent } from './tablamostrarbecas.component';

describe('TablamostrarbecasComponent', () => {
  let component: TablamostrarbecasComponent;
  let fixture: ComponentFixture<TablamostrarbecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablamostrarbecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablamostrarbecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

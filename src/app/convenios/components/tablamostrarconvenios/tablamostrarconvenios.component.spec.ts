import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablamostrarconveniosComponent } from './tablamostrarconvenios.component';

describe('TablamostrarconveniosComponent', () => {
  let component: TablamostrarconveniosComponent;
  let fixture: ComponentFixture<TablamostrarconveniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablamostrarconveniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablamostrarconveniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

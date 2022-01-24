import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablasubirComponent } from './tablasubir.component';

describe('TablasubirComponent', () => {
  let component: TablasubirComponent;
  let fixture: ComponentFixture<TablasubirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablasubirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablasubirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

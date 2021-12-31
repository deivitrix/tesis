import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablabibliotecaComponent } from './tablabiblioteca.component';

describe('TablabibliotecaComponent', () => {
  let component: TablabibliotecaComponent;
  let fixture: ComponentFixture<TablabibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablabibliotecaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablabibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

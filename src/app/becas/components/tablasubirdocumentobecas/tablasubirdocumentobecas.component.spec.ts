import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablasubirdocumentobecasComponent } from './tablasubirdocumentobecas.component';

describe('TablasubirdocumentobecasComponent', () => {
  let component: TablasubirdocumentobecasComponent;
  let fixture: ComponentFixture<TablasubirdocumentobecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablasubirdocumentobecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablasubirdocumentobecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

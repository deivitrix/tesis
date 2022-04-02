import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsubirdocumentobecasComponent } from './dialogsubirdocumentobecas.component';

describe('DialogsubirdocumentobecasComponent', () => {
  let component: DialogsubirdocumentobecasComponent;
  let fixture: ComponentFixture<DialogsubirdocumentobecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogsubirdocumentobecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogsubirdocumentobecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

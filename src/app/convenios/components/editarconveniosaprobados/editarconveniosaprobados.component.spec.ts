import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarconveniosaprobadosComponent } from './editarconveniosaprobados.component';

describe('EditarconveniosaprobadosComponent', () => {
  let component: EditarconveniosaprobadosComponent;
  let fixture: ComponentFixture<EditarconveniosaprobadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarconveniosaprobadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarconveniosaprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsolicitudmovilidadComponent } from './dialogsolicitudmovilidad.component';

describe('DialogsolicitudmovilidadComponent', () => {
  let component: DialogsolicitudmovilidadComponent;
  let fixture: ComponentFixture<DialogsolicitudmovilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogsolicitudmovilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogsolicitudmovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

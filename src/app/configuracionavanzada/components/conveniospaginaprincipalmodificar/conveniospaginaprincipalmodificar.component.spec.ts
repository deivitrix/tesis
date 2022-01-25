import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveniospaginaprincipalmodificarComponent } from './conveniospaginaprincipalmodificar.component';

describe('ConveniospaginaprincipalmodificarComponent', () => {
  let component: ConveniospaginaprincipalmodificarComponent;
  let fixture: ComponentFixture<ConveniospaginaprincipalmodificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveniospaginaprincipalmodificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConveniospaginaprincipalmodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

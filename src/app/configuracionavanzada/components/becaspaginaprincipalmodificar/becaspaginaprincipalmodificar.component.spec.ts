import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecaspaginaprincipalmodificarComponent } from './becaspaginaprincipalmodificar.component';

describe('BecaspaginaprincipalmodificarComponent', () => {
  let component: BecaspaginaprincipalmodificarComponent;
  let fixture: ComponentFixture<BecaspaginaprincipalmodificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecaspaginaprincipalmodificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecaspaginaprincipalmodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

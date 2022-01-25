import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectormodificarpaginaprincipalComponent } from './selectormodificarpaginaprincipal.component';

describe('SelectormodificarpaginaprincipalComponent', () => {
  let component: SelectormodificarpaginaprincipalComponent;
  let fixture: ComponentFixture<SelectormodificarpaginaprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectormodificarpaginaprincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectormodificarpaginaprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

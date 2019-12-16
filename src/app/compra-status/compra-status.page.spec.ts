import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraStatusPage } from './compra-status.page';

describe('CompraStatusPage', () => {
  let component: CompraStatusPage;
  let fixture: ComponentFixture<CompraStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

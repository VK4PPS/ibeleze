import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclameaquiPage } from './reclameaqui.page';

describe('ReclameaquiPage', () => {
  let component: ReclameaquiPage;
  let fixture: ComponentFixture<ReclameaquiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclameaquiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclameaquiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

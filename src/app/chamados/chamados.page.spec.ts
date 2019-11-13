import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosPage } from './chamados.page';

describe('ChamadosPage', () => {
  let component: ChamadosPage;
  let fixture: ComponentFixture<ChamadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

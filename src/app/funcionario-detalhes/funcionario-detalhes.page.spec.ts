import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioDetalhesPage } from './funcionario-detalhes.page';

describe('FuncionarioDetalhesPage', () => {
  let component: FuncionarioDetalhesPage;
  let fixture: ComponentFixture<FuncionarioDetalhesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioDetalhesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

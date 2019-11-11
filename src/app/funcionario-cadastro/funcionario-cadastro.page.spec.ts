import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioCadastroPage } from './funcionario-cadastro.page';

describe('FuncionarioCadastroPage', () => {
  let component: FuncionarioCadastroPage;
  let fixture: ComponentFixture<FuncionarioCadastroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioCadastroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

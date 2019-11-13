import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposCadastroPage } from './grupos-cadastro.page';

describe('GruposCadastroPage', () => {
  let component: GruposCadastroPage;
  let fixture: ComponentFixture<GruposCadastroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposCadastroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

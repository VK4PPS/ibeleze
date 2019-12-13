import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilLeituraPage } from './perfil-leitura.page';

describe('PerfilLeituraPage', () => {
  let component: PerfilLeituraPage;
  let fixture: ComponentFixture<PerfilLeituraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilLeituraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilLeituraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

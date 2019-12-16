import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoSinglePage } from './produto-single.page';

describe('ProdutoSinglePage', () => {
  let component: ProdutoSinglePage;
  let fixture: ComponentFixture<ProdutoSinglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoSinglePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoSinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

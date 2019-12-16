import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoStatusPage } from './pedido-status.page';

describe('PedidoStatusPage', () => {
  let component: PedidoStatusPage;
  let fixture: ComponentFixture<PedidoStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

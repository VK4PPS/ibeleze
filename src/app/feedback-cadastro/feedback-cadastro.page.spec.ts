import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackCadastroPage } from './feedback-cadastro.page';

describe('FeedbackCadastroPage', () => {
  let component: FeedbackCadastroPage;
  let fixture: ComponentFixture<FeedbackCadastroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackCadastroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

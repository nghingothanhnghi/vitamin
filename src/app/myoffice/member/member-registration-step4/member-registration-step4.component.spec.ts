import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRegistrationStep4Component } from './member-registration-step4.component';

describe('MemberRegistrationStep4Component', () => {
  let component: MemberRegistrationStep4Component;
  let fixture: ComponentFixture<MemberRegistrationStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberRegistrationStep4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberRegistrationStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

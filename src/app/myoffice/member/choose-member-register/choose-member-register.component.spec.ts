import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMemberRegisterComponent } from './choose-member-register.component';

describe('ChooseMemberRegisterComponent', () => {
  let component: ChooseMemberRegisterComponent;
  let fixture: ComponentFixture<ChooseMemberRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseMemberRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseMemberRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

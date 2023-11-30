import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPositionComponent } from './member-position.component';

describe('MemberPositionComponent', () => {
  let component: MemberPositionComponent;
  let fixture: ComponentFixture<MemberPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

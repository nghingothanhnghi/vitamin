import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpNoticeComponent } from './hp-notice.component';

describe('HpNoticeComponent', () => {
  let component: HpNoticeComponent;
  let fixture: ComponentFixture<HpNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HpNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

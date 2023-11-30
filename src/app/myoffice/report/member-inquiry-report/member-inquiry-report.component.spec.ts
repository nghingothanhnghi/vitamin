import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInquiryReportComponent } from './member-inquiry-report.component';

describe('MemberInquiryReportComponent', () => {
  let component: MemberInquiryReportComponent;
  let fixture: ComponentFixture<MemberInquiryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberInquiryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberInquiryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

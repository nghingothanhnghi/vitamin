import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAnalysisComponent } from './member-analysis.component';

describe('MemberAnalysisComponent', () => {
  let component: MemberAnalysisComponent;
  let fixture: ComponentFixture<MemberAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

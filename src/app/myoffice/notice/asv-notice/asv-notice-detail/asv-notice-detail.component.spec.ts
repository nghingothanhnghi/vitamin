import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsvNoticeDetailComponent } from './asv-notice-detail.component';

describe('AsvNoticeDetailComponent', () => {
  let component: AsvNoticeDetailComponent;
  let fixture: ComponentFixture<AsvNoticeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsvNoticeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsvNoticeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

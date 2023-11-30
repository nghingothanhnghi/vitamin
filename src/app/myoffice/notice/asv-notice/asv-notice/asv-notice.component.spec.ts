import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsvNoticeComponent } from './asv-notice.component';

describe('AsvNoticeComponent', () => {
  let component: AsvNoticeComponent;
  let fixture: ComponentFixture<AsvNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsvNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsvNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeLayoutComponent } from './notice-layout.component';

describe('NoticeLayoutComponent', () => {
  let component: NoticeLayoutComponent;
  let fixture: ComponentFixture<NoticeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

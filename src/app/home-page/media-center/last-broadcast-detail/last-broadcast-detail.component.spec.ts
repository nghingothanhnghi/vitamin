import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastBroadcastDetailComponent } from './last-broadcast-detail.component';

describe('LastBroadcastDetailComponent', () => {
  let component: LastBroadcastDetailComponent;
  let fixture: ComponentFixture<LastBroadcastDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastBroadcastDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastBroadcastDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

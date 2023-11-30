import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WAlertComponent } from './w-alert.component';

describe('WAlertComponent', () => {
  let component: WAlertComponent;
  let fixture: ComponentFixture<WAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

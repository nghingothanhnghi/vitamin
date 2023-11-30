import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitaminPayComponent } from './vitamin-pay.component';

describe('VitaminPayComponent', () => {
  let component: VitaminPayComponent;
  let fixture: ComponentFixture<VitaminPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitaminPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitaminPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

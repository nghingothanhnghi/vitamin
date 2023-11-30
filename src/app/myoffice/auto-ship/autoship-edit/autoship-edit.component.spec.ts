import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoshipEditComponent } from './autoship-edit.component';

describe('AutoshipEditComponent', () => {
  let component: AutoshipEditComponent;
  let fixture: ComponentFixture<AutoshipEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoshipEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoshipEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

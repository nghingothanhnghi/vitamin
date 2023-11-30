import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumuletSaComponent } from './accumulet-sa.component';

describe('AccumuletSaComponent', () => {
  let component: AccumuletSaComponent;
  let fixture: ComponentFixture<AccumuletSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccumuletSaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccumuletSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

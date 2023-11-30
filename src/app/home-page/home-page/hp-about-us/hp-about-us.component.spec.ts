import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpAboutUsComponent } from './hp-about-us.component';

describe('HpAboutUsComponent', () => {
  let component: HpAboutUsComponent;
  let fixture: ComponentFixture<HpAboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpAboutUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HpAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipPopupComponent } from './zip-popup.component';

describe('ZipPopupComponent', () => {
  let component: ZipPopupComponent;
  let fixture: ComponentFixture<ZipPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZipPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

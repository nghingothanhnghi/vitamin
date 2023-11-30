import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowApielgoDetailComponent } from './now-apielgo-detail.component';

describe('NowApielgoDetailComponent', () => {
  let component: NowApielgoDetailComponent;
  let fixture: ComponentFixture<NowApielgoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowApielgoDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NowApielgoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

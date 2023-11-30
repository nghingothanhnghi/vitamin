import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowApielgoComponent } from './now-apielgo.component';

describe('NowApielgoComponent', () => {
  let component: NowApielgoComponent;
  let fixture: ComponentFixture<NowApielgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowApielgoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NowApielgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

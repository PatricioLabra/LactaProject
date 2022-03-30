import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPrintControlComponent } from './pop-up-print-control.component';

describe('PopUpPrintControlComponent', () => {
  let component: PopUpPrintControlComponent;
  let fixture: ComponentFixture<PopUpPrintControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpPrintControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPrintControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

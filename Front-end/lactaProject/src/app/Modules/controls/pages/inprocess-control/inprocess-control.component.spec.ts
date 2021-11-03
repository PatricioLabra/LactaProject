import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InprocessControlComponent } from './inprocess-control.component';

describe('InprocessControlComponent', () => {
  let component: InprocessControlComponent;
  let fixture: ComponentFixture<InprocessControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InprocessControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InprocessControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

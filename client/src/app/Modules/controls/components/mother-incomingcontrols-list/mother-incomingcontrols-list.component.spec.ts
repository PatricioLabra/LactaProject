import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherIncomingcontrolsListComponent } from './mother-incomingcontrols-list.component';

describe('MotherIncomingcontrolsListComponent', () => {
  let component: MotherIncomingcontrolsListComponent;
  let fixture: ComponentFixture<MotherIncomingcontrolsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotherIncomingcontrolsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherIncomingcontrolsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

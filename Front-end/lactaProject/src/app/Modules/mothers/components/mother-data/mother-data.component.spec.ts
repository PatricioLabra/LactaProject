import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherDataComponent } from './mother-data.component';

describe('MotherDataComponent', () => {
  let component: MotherDataComponent;
  let fixture: ComponentFixture<MotherDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotherDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

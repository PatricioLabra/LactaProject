import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LactancyDataComponent } from './lactancy-data.component';

describe('LactancyDataComponent', () => {
  let component: LactancyDataComponent;
  let fixture: ComponentFixture<LactancyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LactancyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LactancyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

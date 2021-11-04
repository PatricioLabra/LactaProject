import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthDataComponent } from './birth-data.component';

describe('BirthDataComponent', () => {
  let component: BirthDataComponent;
  let fixture: ComponentFixture<BirthDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

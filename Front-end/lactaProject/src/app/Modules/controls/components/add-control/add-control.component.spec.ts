import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddControlComponent } from './add-control.component';

describe('AddControlComponent', () => {
  let component: AddControlComponent;
  let fixture: ComponentFixture<AddControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

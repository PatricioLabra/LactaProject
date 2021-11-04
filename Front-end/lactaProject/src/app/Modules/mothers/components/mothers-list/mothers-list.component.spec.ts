import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MothersListComponent } from './mothers-list.component';

describe('MothersListComponent', () => {
  let component: MothersListComponent;
  let fixture: ComponentFixture<MothersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MothersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MothersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

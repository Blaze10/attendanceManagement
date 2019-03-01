import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDefaultersComponent } from './attendance-defaulters.component';

describe('AttendanceDefaultersComponent', () => {
  let component: AttendanceDefaultersComponent;
  let fixture: ComponentFixture<AttendanceDefaultersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceDefaultersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceDefaultersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

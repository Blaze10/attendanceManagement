import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceFillComponent } from './attendance-fill.component';

describe('AttendanceFillComponent', () => {
  let component: AttendanceFillComponent;
  let fixture: ComponentFixture<AttendanceFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

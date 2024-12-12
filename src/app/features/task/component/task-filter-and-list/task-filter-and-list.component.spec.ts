import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFilterAndListComponent } from './task-filter-and-list.component';

describe('TaskFilterAndListComponent', () => {
  let component: TaskFilterAndListComponent;
  let fixture: ComponentFixture<TaskFilterAndListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFilterAndListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFilterAndListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFullTaskComponent } from './view-full-task.component';

describe('ViewFullTaskComponent', () => {
  let component: ViewFullTaskComponent;
  let fixture: ComponentFixture<ViewFullTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFullTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFullTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

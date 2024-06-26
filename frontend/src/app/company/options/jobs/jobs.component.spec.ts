import { ComponentFixture, TestBed } from '@angular/core/testing';

import { C_JobsComponent } from './jobs.component';

describe('JobsComponent', () => {
  let component: C_JobsComponent;
  let fixture: ComponentFixture<C_JobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [C_JobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(C_JobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

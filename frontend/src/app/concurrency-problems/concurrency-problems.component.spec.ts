import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcurrencyProblemsComponent } from './concurrency-problems.component';

describe('ConcurrencyProblemsComponent', () => {
  let component: ConcurrencyProblemsComponent;
  let fixture: ComponentFixture<ConcurrencyProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcurrencyProblemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConcurrencyProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

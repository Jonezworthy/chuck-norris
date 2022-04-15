import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractPromptComponent } from './interact-prompt.component';

describe('InteractPromptComponent', () => {
  let component: InteractPromptComponent;
  let fixture: ComponentFixture<InteractPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

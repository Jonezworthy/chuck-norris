import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractConfirmComponent } from './interact-confirm.component';

describe('InteractConfirmComponent', () => {
  let component: InteractConfirmComponent;
  let fixture: ComponentFixture<InteractConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

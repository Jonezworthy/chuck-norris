import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractDialogComponent } from './interact-dialog.component';

describe('InteractDialogComponent', () => {
  let component: InteractDialogComponent;
  let fixture: ComponentFixture<InteractDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractLoadingComponent } from './interact-loading.component';

describe('InteractLoadingComponent', () => {
  let component: InteractLoadingComponent;
  let fixture: ComponentFixture<InteractLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

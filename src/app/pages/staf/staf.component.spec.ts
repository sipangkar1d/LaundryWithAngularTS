import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StafComponent } from './staf.component';

describe('StafComponent', () => {
  let component: StafComponent;
  let fixture: ComponentFixture<StafComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StafComponent]
    });
    fixture = TestBed.createComponent(StafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftenerComponent } from './softener.component';

describe('SoftenerComponent', () => {
  let component: SoftenerComponent;
  let fixture: ComponentFixture<SoftenerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftenerComponent]
    });
    fixture = TestBed.createComponent(SoftenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

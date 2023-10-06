import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoardingpassBaggagesComponent } from './check-boardingpass-baggages.component';

describe('CheckBoardingpassBaggagesComponent', () => {
  let component: CheckBoardingpassBaggagesComponent;
  let fixture: ComponentFixture<CheckBoardingpassBaggagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckBoardingpassBaggagesComponent]
    });
    fixture = TestBed.createComponent(CheckBoardingpassBaggagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

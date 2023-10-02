import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecairlinesComponent } from './tecairlines.component';

describe('TecairlinesComponent', () => {
  let component: TecairlinesComponent;
  let fixture: ComponentFixture<TecairlinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TecairlinesComponent]
    });
    fixture = TestBed.createComponent(TecairlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

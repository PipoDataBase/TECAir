import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromotionsComponent } from './add-promotions.component';

describe('AddPromotionsComponent', () => {
  let component: AddPromotionsComponent;
  let fixture: ComponentFixture<AddPromotionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPromotionsComponent]
    });
    fixture = TestBed.createComponent(AddPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

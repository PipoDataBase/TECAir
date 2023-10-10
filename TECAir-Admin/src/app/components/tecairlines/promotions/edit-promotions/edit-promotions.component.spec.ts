import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromotionsComponent } from './edit-promotions.component';

describe('EditPromotionsComponent', () => {
  let component: EditPromotionsComponent;
  let fixture: ComponentFixture<EditPromotionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPromotionsComponent]
    });
    fixture = TestBed.createComponent(EditPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

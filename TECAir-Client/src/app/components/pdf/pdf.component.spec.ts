import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFComponent } from './pdf.component';

describe('PDFComponent', () => {
  let component: PDFComponent;
  let fixture: ComponentFixture<PDFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PDFComponent]
    });
    fixture = TestBed.createComponent(PDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

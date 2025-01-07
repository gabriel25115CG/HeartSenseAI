import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqtextComponent } from './faqtext.component';

describe('FaqtextComponent', () => {
  let component: FaqtextComponent;
  let fixture: ComponentFixture<FaqtextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqtextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqtextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

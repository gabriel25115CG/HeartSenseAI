import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermstextComponent } from './termstext.component';

describe('TermstextComponent', () => {
  let component: TermstextComponent;
  let fixture: ComponentFixture<TermstextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermstextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermstextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

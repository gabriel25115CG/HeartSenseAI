import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyformComponent } from './privacyform.component';

describe('PrivacyformComponent', () => {
  let component: PrivacyformComponent;
  let fixture: ComponentFixture<PrivacyformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

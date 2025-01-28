import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfoundformComponent } from './notfoundform.component';

describe('NotfoundformComponent', () => {
  let component: NotfoundformComponent;
  let fixture: ComponentFixture<NotfoundformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotfoundformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotfoundformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

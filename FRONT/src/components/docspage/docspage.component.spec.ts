import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocspageComponent } from './docspage.component';

describe('DocspageComponent', () => {
  let component: DocspageComponent;
  let fixture: ComponentFixture<DocspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EntryRowComponent } from "./entry-row.component";


describe('EntryRowComponent', () => {
  let component: EntryRowComponent;
  let fixture: ComponentFixture<EntryRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

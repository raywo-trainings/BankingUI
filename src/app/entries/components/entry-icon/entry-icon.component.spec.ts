import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EntryIconComponent } from "./entry-icon.component";


describe('EntryIconComponent', () => {
  let component: EntryIconComponent;
  let fixture: ComponentFixture<EntryIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

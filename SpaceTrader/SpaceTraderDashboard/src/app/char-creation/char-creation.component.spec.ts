import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CharCreationComponent } from "./char-creation.component";

describe("CharCreationComponent", () => {
  let component: CharCreationComponent;
  let fixture: ComponentFixture<CharCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharCreationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

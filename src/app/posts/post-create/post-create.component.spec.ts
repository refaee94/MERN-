import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PostCreateComponent } from "./post-create.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PostCreateComponent", () => {

  let fixture: ComponentFixture<PostCreateComponent>;
  let component: PostCreateComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PostCreateComponent]
    });

    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

import { PostsService } from "./posts.service";
import { TestBed } from "@angular/core/testing";

describe("PostsService", () => {

  let service: PostsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsService
      ]
    });
    service = TestBed.get(PostsService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});

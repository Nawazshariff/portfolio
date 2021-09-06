import { getTestBed, TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { ProjectsService } from "./projects.service";

describe("ProjectService", () => {
  let injector: TestBed;
  let pService: ProjectsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectsService],
    });

    injector = getTestBed();
    pService = injector.get(ProjectsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should get all repos", () => {
    const dummyRepo = [{ n: "hi" }];
    pService.getAllRepos().subscribe((res: any) => {
      expect(res.length).toEqual(1);
      expect(res).toEqual(dummyRepo);
    });
    const req = httpMock.expectOne(
      "https://api.github.com/users/nawazshariff/repos"
    );
    expect(req.request.method).toBe("GET");
    req.flush(dummyRepo);
  });
});

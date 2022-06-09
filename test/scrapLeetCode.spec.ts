import ScrapLeetCode, {
  outPutSiteGetProblems,
} from "../src/classes/scrapLeetCode.class";
import IScrapLeetCode from "../src/interface/scrapLeetCode.interface";

let scrapLeetCode: IScrapLeetCode = new ScrapLeetCode();

jest.mock("../src/repository/cookie.repository", () => {
  return {
    CookieRepository: jest.fn().mockImplementation(() => {
      return {
        getCookie: jest.fn(() => ({
          cookie: "",
          crfToken: "",
        })),
      };
    }),
  };
});

beforeEach(() => {
  scrapLeetCode = new ScrapLeetCode();
});

describe("Scrap LeetCode", () => {
  describe("getFiftyProblems", () => {
    it("success", async () => {
      const res = await scrapLeetCode.getFiftyProblems();

      expect(res.length).toEqual(50);
    });
  });

  describe("getSimilarForProblem", () => {
    it("success", async () => {
      const res = await scrapLeetCode.getSimilarForProblem("two-sum");

      expect(res.similars.length).toEqual(12);
    });
  });
});

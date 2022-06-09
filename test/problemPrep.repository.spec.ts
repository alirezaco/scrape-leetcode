import { ProblemPrepType } from "src/repository/problemPrep.repository";
import IProblemRepository, {
  ProblemRepository,
} from "../src/repository/problem.repository";

let problemRepository: IProblemRepository = new ProblemRepository();

const problems: ProblemPrepType[] = [
  { problem: "test1", similars: ["test2", "test3"] },
  { problem: "test2", similars: ["test1", "test4"] },
  { problem: "test3", similars: ["test1"] },
];

beforeEach(() => {
  jest.clearAllMocks();
  problemRepository = new ProblemRepository();
});

describe("problem prep repository", () => {
  describe("set problem", () => {
    it("success", () => {
      problemRepository.createData = jest.fn();

      problemRepository.setProblem(problems[0]);

      expect(problemRepository.createData).toBeCalledWith(problems[0]);
    });
  });

  beforeEach(() => {
    problems.map((item) => {
      problemRepository.setProblem(item);
    });
  });

  describe("get all problems", () => {
    it("success", () => {
      const res = problemRepository.getAllProblems();

      expect(res).toEqual(problems);
    });
  });

  describe("get one problem", () => {
    it("success", () => {
      const res = problemRepository.getOneProblem("test1");

      expect(res).toEqual(problems[0]);
    });
  });
});

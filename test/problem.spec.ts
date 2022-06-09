import Problem from "../src/classes/problem.class";
import IProblem, { ProblemType } from "../src/interface/problem.interface";

let problem: IProblem = new Problem(5, 5);
const problems: ProblemType[] = [
  { problem: "test1", similars: ["test2", "test3"] },
  { problem: "test2", similars: ["test1", "test4"] },
  { problem: "test3", similars: ["test1"] },
];

var insertMock = jest.fn(() => {});
var getRowMock = jest.fn(() => [{ col: 1 }, { col: 2 }]);
var removeMock = jest.fn();

jest.mock("../src/classes/sparseMatris.class", () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getARow: getRowMock,
        remove: removeMock
      };
    }),
  };
});

beforeEach(() => {
  insertMock.mockClear();
  getRowMock.mockClear();
  removeMock.mockClear();
  problem = new Problem(10, 10);
});

describe("problem", () => {
  describe("insert problem", () => {
    it("success", () => {
      const res = problem.insertProblem(problems[0]);

      expect(insertMock).toBeCalled();

      expect(insertMock.mock.calls).toEqual([
        [0, 1, 1],
        [1, 0, 1],
        [0, 2, 1],
        [2, 0, 1],
      ]);

      expect(res).toBeUndefined();
    });
  });

  describe("array2sparse", () => {
    it("success", () => {
      const res = problem.array2sparse(problems);

      expect(insertMock.mock.calls.length).toEqual(10);

      expect(res).toBeUndefined();
    });
  });

  describe("get similars", () => {
    beforeEach(() => {
      problem.array2sparse(problems);
    });

    it("success", () => {
      const res = problem.getSimilars(problems[0].problem);

      expect(res).toEqual(problems[0]);
    });
  });

  describe("remove problem", () => {
    beforeEach(() => {
      problem.insertProblem(problems[0]);
    });

    it("success", () => {
      const res = problem.removeProblem(problems[0].problem);

      expect(removeMock).toBeCalled();

      expect(getRowMock).toBeCalled();

      expect(res).toEqual(1);
    });
  });
});

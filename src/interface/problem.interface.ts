import ISparseMatris from "./sparseMatris.interface.js";

export type ProblemType = {
  problem: string;
  similars: Array<string>;
};

export default interface IProblem {
  problems: Array<string>;

  sparseMatris: ISparseMatris;

  insertProblem: (problem: ProblemType) => void;

  removeProblem: (problem: string) => number;

  getSimilars: (problem: string) => ProblemType;

  array2sparse: (arr: Array<ProblemType>) => void;

  sparse2array: () => Array<ProblemType>;
}

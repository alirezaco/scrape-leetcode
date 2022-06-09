import IProblem, { ProblemType } from "../interface/problem.interface";
import sparseMatrisInterface from "../interface/sparseMatris.interface";
import SparseMatris from "./sparseMatris.class";

export default class Problem implements IProblem {
  problems: string[] = [];
  sparseMatris: sparseMatrisInterface;

  constructor(private readonly row: number, private readonly col: number) {
    this.sparseMatris = new SparseMatris(this.row, this.col);
  }

  private getAndInsertProblemInProblems = (problem: string): number => {
    const indexProblem = this.problems.indexOf(problem);

    if (indexProblem === -1) {
      this.problems.push(problem);
      return this.problems.length - 1;
    }

    return indexProblem;
  };

  insertProblem = (problem: ProblemType): void => {
    const indexProblem = this.getAndInsertProblemInProblems(problem.problem);

    problem.similars.map((item) => {
      const indexSimilarProblem = this.getAndInsertProblemInProblems(item);

      this.sparseMatris.insert(indexProblem, indexSimilarProblem, 1);
      this.sparseMatris.insert(indexSimilarProblem, indexProblem, 1);
    });
  };

  removeProblem = (problem: string): number => {
    const indexProblem = this.problems.indexOf(problem);

    const nodes = this.sparseMatris.getARow(indexProblem);

    nodes.map((item) => {
      this.sparseMatris.remove(item.col, item.row);

      this.sparseMatris.remove(item.row, item.col);
    });

    return 1;
  };

  getSimilars = (problem: string): ProblemType => {
    const index = this.problems.indexOf(problem);

    const similarsIndex: number[] = this.sparseMatris
      .getARow(index)
      .map((item) => {
        return item.col;
      });

    const similars: string[] = this.problems.filter((_, index) =>
      similarsIndex.includes(index)
    );

    return {
      problem,
      similars,
    };
  };

  array2sparse = (arr: ProblemType[]): void => {
    arr.map((item) => {
      this.insertProblem(item);
    });
  };

  sparse2array = (): ProblemType[] => {
    return this.problems.map((item) => {
      return this.getSimilars(item);
    });
  };
}

import { ProblemType } from "./problem.interface";

export default interface IScrapLeetCode {
  getFiftyProblems: (page?: number) => Promise<string[]>;

  getSimilarForProblem: (problem: string) => Promise<ProblemType>;

  scrapLeetCodeSiteAndStore: () => Promise<ProblemType[]>;

  totalProblems: number;
}

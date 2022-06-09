import IDataBace from "src/interface/dataBase.interface";
import { ProblemType } from "src/interface/problem.interface";
import DataBase from "../database/dataBase.class";

export default interface IProblemRepository extends IDataBace<ProblemType> {
  setProblem: (newProblem: ProblemType) => void;

  getAllProblems: () => ProblemType[];

  getOneProblem: (problemName: string) => ProblemType;
}

export class ProblemRepository
  extends DataBase<ProblemType>
  implements IProblemRepository
{
  constructor() {
    super("problems.json");
  }

  setProblem = (newProblem: ProblemType): void => {
    this.createData(newProblem);
  };

  getAllProblems = (): ProblemType[] => {
    const countProblems = this.getLength();
    const problems = this.getAllData(() => true, countProblems);

    return problems;
  };

  getOneProblem = (problemName: string): ProblemType => {
    const problem = this.getOneData(
      (item: ProblemType) => item.problem === problemName
    );

    return problem;
  };
}

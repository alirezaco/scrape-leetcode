import IDataBace from "src/interface/dataBase.interface";
import DataBase from "../database/dataBase.class";

export default interface IProblemPrepRepository extends IDataBace<ProblemPrepType> {
  setProblemPrep: (newProblem: ProblemPrepType) => void;

  getAllProblemsPrep: () => ProblemPrepType[];

  getOneProblemPrep: (problemName: string) => ProblemPrepType;
}

export type ProblemPrepType = {
    problem: string;
    similars: Array<string>;
}


export class ProblemPrepRepository
  extends DataBase<ProblemPrepType>
  implements IProblemPrepRepository
{
  constructor() {
    super("problems.prep.json");
  }

  setProblemPrep = (newProblem: ProblemPrepType): void => {
    this.createData(newProblem);
  };

  getAllProblemsPrep = (): ProblemPrepType[] => {
    const countProblems = this.getLength();
    const problems = this.getAllData(() => true, countProblems);

    return problems;
  };

  getOneProblemPrep = (problemName: string): ProblemPrepType => {
    const problem = this.getOneData(
      (item: ProblemPrepType) => item.problem === problemName
    );

    return problem;
  };
}

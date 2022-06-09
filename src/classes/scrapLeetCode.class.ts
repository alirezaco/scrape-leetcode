import axios, { AxiosInstance } from "axios";
import IProblemRepository, {
  ProblemRepository,
} from "../repository/problem.repository";
import { ProblemType } from "../interface/problem.interface";
import IScrapLeetCode from "../interface/scrapLeetCode.interface";
import ICookieRepository, {
  CookieRepository,
  cookieType,
} from "../repository/cookie.repository";

export type outPutSiteGetProblems = {
  data: {
    problemsetQuestionList: {
      total: number;
      questions: Array<{
        titleSlug: string;
      }>;
    };
  };
};

export type outPutSiteSimilarProblem = {
  data: {
    question: {
      similarQuestions: string;
    };
  };
};

export default class ScrapLeetCode implements IScrapLeetCode {
  private readonly leetCodeDomain: string;
  private cookie: cookieType;
  private cookieRepo: ICookieRepository;
  private request: AxiosInstance;
  private problemRepo: IProblemRepository;

  totalProblems: number;

  constructor() {
    this.cookieRepo = new CookieRepository();
    this.problemRepo = new ProblemRepository();
    this.cookie = this.cookieRepo.getCookie();
    this.leetCodeDomain = "	https://leetcode.com/graphql";
    this.request = axios.create({
      baseURL: this.leetCodeDomain,
      headers: {
        cookie: this.cookie.cookie,
        "x-csrftoken": this.cookie.crfToken,
      },
    });
  }

  private createFiftyProblemsAndStore = async (page = 0): Promise<void> => {
    const data = await this.getFiftyProblems(page);
    await data.map(async (item) => {
      try {
        const res = await this.getSimilarForProblem(item);
        this.problemRepo.setProblem(res);
      } catch (error) {}
    });
  };

  getFiftyProblems = async (page: number = 0): Promise<string[]> => {
    const {
      data: {
        data: { problemsetQuestionList: problems },
      },
    } = await this.request.post<outPutSiteGetProblems>("/", {
      query:
        "\n query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {\n problemsetQuestionList: questionList(\n categorySlug: $categorySlug\n limit: $limit\n skip: $skip\n filters: $filters\n ) {\n total: totalNum\n questions: data {\n acRate\n difficulty\n freqBar\n frontendQuestionId: questionFrontendId\n isFavor\n paidOnly: isPaidOnly\n status\n title\n titleSlug\n topicTags {\n name\n id\n slug\n }\n hasSolution\n hasVideoSolution\n }\n }\n}\n ",
      variables: {
        categorySlug: "",
        filters: {},
        limit: 50,
        skip: page,
      },
    });

    this.totalProblems = problems.total;

    return problems.questions.map((item) => {
      return item.titleSlug;
    });
  };

  getSimilarForProblem = async (problem: string): Promise<ProblemType> => {
    const {
      data: {
        data: {
          question: { similarQuestions },
        },
      },
    } = await this.request.post<outPutSiteSimilarProblem>("/", {
      operationName: "questionData",
      variables: { titleSlug: problem },
      query:
        "query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    boundTopicId\n    title\n    titleSlug\n    content\n    translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n    exampleTestcases\n    categoryTitle\n    contributors {\n      username\n      profileUrl\n      avatarUrl\n      __typename\n    }\n    topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    companyTagStats\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n    hints\n    solution {\n      id\n      canSeeDetail\n      paidOnly\n      hasVideoSolution\n      paidOnlyVideo\n      __typename\n    }\n    status\n    sampleTestCase\n    metaData\n    judgerAvailable\n    judgeType\n    mysqlSchemas\n    enableRunCode\n    enableTestMode\n    enableDebugger\n    envInfo\n    libraryUrl\n    adminUrl\n    challengeQuestion {\n      id\n      date\n      incompleteChallengeCount\n      streakCount\n      type\n      __typename\n    }\n    __typename\n  }\n}\n",
    });

    const similars = JSON.parse(similarQuestions);

    return {
      problem,
      similars: similars.map((item: any) => {
        return item.titleSlug;
      }),
    };
  };

  scrapLeetCodeSiteAndStore = async (): Promise<ProblemType[]> => {
    try {
      await this.createFiftyProblemsAndStore(0);
      const allPages = Math.ceil(this.totalProblems / 50);

      for (let page = 1; page < allPages; page++) {
        await this.createFiftyProblemsAndStore(page);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      return this.problemRepo.getAllProblems();
    }
  };
}

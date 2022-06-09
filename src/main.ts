import Problem from "./classes/problem.class";
import ScrapLeetCode from "./classes/scrapLeetCode.class";
import IProblem from "./interface/problem.interface";
import IScrapLeetCode from "./interface/scrapLeetCode.interface";
import ICookieRepository, {
  CookieRepository,
  cookieType,
} from "./repository/cookie.repository";
import IProblemPrepRepository, {
  ProblemPrepRepository,
} from "./repository/problemPrep.repository";

const cookie: cookieType = {
  cookie:
    "csrftoken=SLEJjLlTTWDW8wC9zti2dsxuI27haGUspGB8aAo0E3q1N10UtmC8PYdPKo5JsfoU; _ga=GA1.2.1353715179.1653502746; gr_user_id=3d9cbe9c-f2a3-46d8-bd3d-a4af1ee30671; _gid=GA1.2.592860835.1654183572; NEW_PROBLEMLIST_PAGE=1; 87b5a3c3f1a55520_gr_session_id_2640a7bb-4528-41fb-974e-dcc62fa9e705=true; 87b5a3c3f1a55520_gr_session_id=2640a7bb-4528-41fb-974e-dcc62fa9e705; _gat=1",
  crfToken: "SLEJjLlTTWDW8wC9zti2dsxuI27haGUspGB8aAo0E3q1N10UtmC8PYdPKo5JsfoU",
};

(async () => {
  const cookieRepo: ICookieRepository = new CookieRepository();
  const problemPrepRepo: IProblemPrepRepository = new ProblemPrepRepository();

  cookieRepo.setCookie(cookie);

  const scrapLeetCode: IScrapLeetCode = new ScrapLeetCode();
  const problems = await scrapLeetCode.scrapLeetCodeSiteAndStore();

  const problemMatris: IProblem = new Problem(
    scrapLeetCode.totalProblems,
    scrapLeetCode.totalProblems
  );

  problemMatris.array2sparse(problems);

  const problemPreps = problemMatris.sparse2array();

  problemPreps.map((item) => {
    problemPrepRepo.setProblemPrep(item);
  });
})();

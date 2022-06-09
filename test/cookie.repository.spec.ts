import ICookieRepository, {
  CookieRepository,
  cookieType,
} from "../src/repository/cookie.repository";

let cookieRepository: ICookieRepository = new CookieRepository();

const cookieTest: cookieType = {
  cookie: "12345",
  crfToken: "123456",
};

beforeEach(() => {
  cookieRepository = new CookieRepository();
  jest.clearAllMocks();
});

describe("cookie repository", () => {
  describe("set cookie", () => {
    it("success", () => {
      cookieRepository.createData = jest.fn();

      cookieRepository.setCookie(cookieTest);

      expect(cookieRepository.createData).toBeCalledWith(cookieTest);
    });
  });

  describe("get cookie", () => {
    it("success", () => {
      cookieRepository.setCookie(cookieTest);

      const cookie: cookieType = cookieRepository.getCookie();

      expect(cookie).toEqual(cookieTest);
    });

    it("not found", () => {
      try {
        const cookie: cookieType = cookieRepository.getCookie();

        expect(1).toEqual(0);
      } catch (error) {
        expect(error.message).toEqual("not found data");
      }
    });
  });
});

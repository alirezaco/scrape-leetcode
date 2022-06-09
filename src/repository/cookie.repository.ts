import IDataBace from "src/interface/dataBase.interface";
import DataBase from "../database/dataBase.class";

export type cookieType = {
  crfToken: string;
  cookie: string;
};

export default interface ICookieRepository extends IDataBace<cookieType> {
  setCookie: (cookie: cookieType) => void;

  getCookie: () => cookieType;
}

export class CookieRepository
  extends DataBase<cookieType>
  implements ICookieRepository
{
  constructor() {
    super("cookie.json");
  }

  setCookie = (cookie: cookieType): void => {
    this.createData(cookie);
  };

  getCookie = (): cookieType => {
    const cookie = this.getOneData(() => true);
    
    return cookie;
  };
}

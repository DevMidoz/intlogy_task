export interface IUser {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUserData[];
  support: IUserDataSupport
}

export interface IUserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface IUserDataSupport {
    url: string;
    text: string;
  };


  export interface IUserDetails {
    data :IUserData
    support: IUserDataSupport
 }
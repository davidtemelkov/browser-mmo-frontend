import { getUserFromStorage } from "../utils/localStorage";

const baseUrl = "http://localhost:8080/users";

export interface IValueLogin {
    email: string;
    password: string;
}

export interface IValueRegister{
    name: string;
    email: string;
    password: string;
    imageURL: string;
}

export interface IFetchedUser{
    name: string;
    email: string;
    createdOn: string;
    imageURL: string;
    level: number;
    gold : number;
    EXP : number;
    bigDPoints : number;
    strength : number;
    dexterity : number;
    constitution: number;
    intelligence: number;
    items: Map<string,string>;
    weaponShop: Map<string,string>;
    magicShop: Map<string,string>;
    inventory: Map<string,string>;
    mount: string;
    mountImageURL: string;
    isQuesting: boolean,
    isWorking: boolean,
    currentQuests: Map<string, IQuest>;
}

export interface IQuest{
  Name: string;
  ImageURL: string;
  Time: string;
  EXP: string;
  Gold: string;
}

export const initialQuest: IQuest = {
  Name: "", // Note: Property names should match the response
  ImageURL: "",
  Time: "",
  EXP: "",
  Gold: "",
};

export const login = async(values : IValueLogin) => {
    const body = JSON.stringify(values);

    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body,
    });
  
    if (response.status == 203) {
      return;
    }
  
    if (response.status == 401) {
      throw new Error("Unautorized: Password or email are incorrect");
    }
  
    if (response.status == 400) {
      throw new Error("Bad request: Data provided isn't in the correct format");
    }
  
    const jwt = await response.json();

    return jwt;
  };

  export const register = async (value: IValueRegister) => {
    const body = JSON.stringify(value);
  
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body,
    });
  
    if (response.status == 203) {
      return;
    }
  
    if (response.status == 409) {
      throw new Error("Conflict: User with this email already exists");
    }
  
    if (response.status == 400) {
      throw new Error("Bad request: Data provided isn't in the correct format");
    }
  
    const jwt = await response.json();

    return jwt;
  };

  export const getUser = async (email: string) => {
    const jwt = getUserFromStorage()!.token;
    
    if (!jwt) {
      return;
    }
  
    const response = await fetch(`${baseUrl}/${email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
    });
  
    if (response.status == 204) {
      throw new Error("")
    }
  
    const data : IFetchedUser  = await response.json();
  
    return data;
  };

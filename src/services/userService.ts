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

export const initalUser : IFetchedUser = {
  name: "name",
  email: "email@abv.bg",
  createdOn: "00-00-00T00:000:00",
  imageURL: "https://ibb.co/sWmhkXw",
  level: 0,
  gold: 0,
  EXP: 0,
  bigDPoints: 0,
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  items: new Map<string, string>([
    ["Amulet", "https://ibb.co/sWmhkXw"],
    ["Boots", "https://ibb.co/sWmhkXw"],
    ["Chestplate", "https://ibb.co/sWmhkXw"],
    ["Gloves", "https://ibb.co/sWmhkXw"],
    ["Helmet", "https://ibb.co/sWmhkXw"],
    ["Ring", "https://ibb.co/sWmhkXw"],
    ["Shield", "https://ibb.co/sWmhkXw"],
    ["Weapon", "https://ibb.co/sWmhkXw"],
  ]),
  weaponShop: new Map<string, string>([
    ["1", ""],
    ["2", ""],
    ["3", ""],
    ["4", ""],
    ["5", ""],
    ["6", ""],
  ]),
  magicShop: new Map<string, string>([
    ["1", ""],
    ["2", ""],
    ["3", ""],
    ["4", ""],
    ["5", ""],
    ["6", ""],
  ]),
  inventory: new Map<string, string>([
    ["1", ""],
    ["2", ""],
    ["3", ""],
    ["4", ""],
    ["5", ""],
    ["6", ""],
    ["7", ""],
    ["8", ""],
    ["9", ""],
    ["10", ""],
    ["11", ""],
    ["12", ""],
    ["13", ""],
    ["14", ""],
    ["15", ""],
  ]),
  mount: "",
  mountImageURL: "",
  isQuesting: false,
  isWorking: false,
  currentQuests: new Map<string, IQuest>([
    ["0", { ...initialQuest }],
    ["1", { ...initialQuest }],
    ["2", { ...initialQuest }],
  ]),
}

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

  export const upgradeStrength = async () => {
    const jwt = getUserFromStorage()!.token;
    
    if (!jwt) {
      return;
    }
  
    const response = await fetch(`${baseUrl}/strength`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
    });
  
    if (response.status == 403) {
      throw new Error("Not enough gold")
    }

    return response.status;
  };

  export const upgradeDexterity = async () => {
    const jwt = getUserFromStorage()!.token;
    
    if (!jwt) {
      return;
    }
  
    const response = await fetch(`${baseUrl}/dexterity`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
    });
  
    if (response.status == 403) {
      throw new Error("Not enough gold")
    }

    return response.status;
  };

  export const upgradeConstitution = async () => {
    const jwt = getUserFromStorage()!.token;
    
    if (!jwt) {
      return;
    }
  
    const response = await fetch(`${baseUrl}/constitution`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
    });
  
    if (response.status == 403) {
      throw new Error("Not enough gold")
    }

    return response.status;
  };

  export const upgradeIntelligence = async () => {
    const jwt = getUserFromStorage()!.token;
    
    if (!jwt) {
      return;
    }
  
    const response = await fetch(`${baseUrl}/intelligence`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
    });
  
    if (response.status == 403) {
      throw new Error("Not enough gold")
    }

    return response.status;
  };

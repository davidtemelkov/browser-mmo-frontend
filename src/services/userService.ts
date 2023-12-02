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
    items: Record<string,IItem>;
    weaponShop: Record<string,IItem>;
    magicShop: Record<string,IItem>;
    inventory: Record<string,IItem>;
    mount: string;
    mountImageURL: string;
    isQuesting: boolean,
    isWorking: boolean,
    quests: Record<string, IQuest>;
    currentQuest: Record<string, IQuest>;
    questingUntil: string;
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

export const initialItem: IItem = {
  id: "0",
  name: "",
  level: "",
  damageMin: 0,
  damageMax: 0,
  damageAverage: 0,
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  armourAmount: 0,
  blockChance: 0,
  isLegendary: false,
  imageURL: "",
  price: 0
};

export const initalUser : IFetchedUser = {
  name: "name",
  email: "email@abv.bg",
  createdOn: "00-00-00T00:000:00",
  imageURL: "",
  level: 0,
  gold: 0,
  EXP: 0,
  bigDPoints: 0,
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  items: {
    "Amulet": { ...initialItem },
    "Boots": { ...initialItem },
    "Chestplate": { ...initialItem },
    "Gloves": { ...initialItem },
    "Helmet": { ...initialItem },
    "Ring": { ...initialItem },
    "Shield": { ...initialItem },
    "Weapon": { ...initialItem },
  },
  weaponShop:{
    "Item1": { ...initialItem },
    "Item2": { ...initialItem },
    "Item3": { ...initialItem },
    "Item4": { ...initialItem },
    "Item5": { ...initialItem },
    "Item6": { ...initialItem },
  },
  magicShop: {
    "Item1": { ...initialItem },
    "Item2": { ...initialItem },
    "Item3": { ...initialItem },
    "Item4": { ...initialItem },
    "Item5": { ...initialItem },
    "Item6": { ...initialItem },
  },
  inventory: {
    "Item1": { ...initialItem },
    "Item2": { ...initialItem },
    "Item3": { ...initialItem },
    "Item4": { ...initialItem },
    "Item5": { ...initialItem },
    "Item6": { ...initialItem },
    "Item7": { ...initialItem },
    "Item8": { ...initialItem },
    "Item9": { ...initialItem },
    "Item10": { ...initialItem },
    "Item11": { ...initialItem },
    "Item12": { ...initialItem },
    "Item13": { ...initialItem },
    "Item14": { ...initialItem },
    "Item15": { ...initialItem },
  },
  mount: "",
  mountImageURL: "",
  isQuesting: false,
  isWorking: false,
  quests: {
    "Quest0": { ...initialQuest },
    "Quest1": { ...initialQuest },
    "Quest2": { ...initialQuest },
  },
  currentQuest: {
    "CurrentQuest": { ...initialQuest },
  },
  questingUntil: ""
}

export interface IItem{
  id: string;
  name: string;
  level: string;
  damageMin: number;
  damageMax: number;
  damageAverage: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  armourAmount: number;
  blockChance: number;
  isLegendary: boolean;
  imageURL: string;
  price: number;
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

import { getUserFromStorage } from "../utils/localStorage";

const baseUrl = "https://browser-mmo-backend.fly.dev/users";
//const baseUrl = "http://localhost:8080/users";

export interface IValueLogin {
  email: string;
  password: string;
}

export interface IValueRegister {
  name: string;
  email: string;
  password: string;
  imageURL: string;
}

export interface IFetchedUser {
  id: string;
  name: string;
  email: string;
  createdOn: string;
  imageId: string;
  lvl: number;
  gold: number;
  exp: number;
  bigDPoints: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  totalStrength: number;
  totalDexterity: number;
  totalConstitution: number;
  totalIntelligence: number;
  equippedItems: Record<string, IItem>;
  weaponShop: Record<string, IItem>;
  magicShop: Record<string, IItem>;
  inventory: Record<string, IItem>;
  mount: string;
  mountImageId: string;
  isQuesting: boolean;
  isWorking: boolean;
  quests: Record<string, IQuest>;
  currentQuest: Record<string, IQuest>;
  questingUntil: string;
  workingUntil: string;
  workReward: number;
  workDuration: number;
  lastPlayedDate: string;
  dailyQuestCount: number;
  armourAmount: number;
  blockChance: number;
  damageMin: number;
  damageMax: number;
  damageAverage: number;
  dungeon: number;
}

export interface IQuest {
  id: string;
  name: string;
  time: string;
  exp: string;
  gold: string;
}

export interface IWork {
  Hours: number;
  Reward: number;
}

export const initialQuest: IQuest = {
  id: "",
  name: "",
  time: "",
  exp: "",
  gold: "",
};

export const initialItem: IItem = {
  id: "",
  whatItem: "",
  name: "",
  lvl: "",
  damageMin: 0,
  damageMax: 0,
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  armourAmount: 0,
  blockChance: 0,
  isLegendary: false,
  price: 0,
};

export const initalUser: IFetchedUser = {
  id: "",
  name: "name",
  email: "email@abv.bg",
  createdOn: "00-00-00T00:000:00",
  imageId: "",
  lvl: 0,
  gold: 0,
  exp: 0,
  bigDPoints: 0,
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  totalStrength: 0,
  totalDexterity: 0,
  totalConstitution: 0,
  totalIntelligence: 0,
  armourAmount: 0,
  blockChance: 0,
  damageMin: 0,
  damageMax: 0,
  damageAverage: 0,
  equippedItems: {
    Amulet: { ...initialItem },
    Boots: { ...initialItem },
    Chestplate: { ...initialItem },
    Gloves: { ...initialItem },
    Helmet: { ...initialItem },
    Ring: { ...initialItem },
    Shield: { ...initialItem },
    Weapon: { ...initialItem },
  },
  weaponShop: {
    Item1: { ...initialItem },
    Item2: { ...initialItem },
    Item3: { ...initialItem },
    Item4: { ...initialItem },
    Item5: { ...initialItem },
    Item6: { ...initialItem },
  },
  magicShop: {
    Item1: { ...initialItem },
    Item2: { ...initialItem },
    Item3: { ...initialItem },
    Item4: { ...initialItem },
    Item5: { ...initialItem },
    Item6: { ...initialItem },
  },
  inventory: {
    Item1: { ...initialItem },
    Item2: { ...initialItem },
    Item3: { ...initialItem },
    Item4: { ...initialItem },
    Item5: { ...initialItem },
    Item6: { ...initialItem },
    Item7: { ...initialItem },
    Item8: { ...initialItem },
    Item9: { ...initialItem },
    Item10: { ...initialItem },
    Item11: { ...initialItem },
    Item12: { ...initialItem },
    Item13: { ...initialItem },
    Item14: { ...initialItem },
    Item15: { ...initialItem },
  },
  mount: "",
  mountImageId: "",
  isQuesting: false,
  isWorking: false,
  quests: {
    Quest0: { ...initialQuest },
    Quest1: { ...initialQuest },
    Quest2: { ...initialQuest },
  },
  currentQuest: {
    CurrentQuest: { ...initialQuest },
  },
  questingUntil: "",
  workingUntil: "",
  workReward: 0,
  workDuration: 0,
  lastPlayedDate: "",
  dailyQuestCount: 0,
  dungeon: 0,
};

export interface IItem {
  id: string;
  whatItem: string;
  name: string;
  lvl: string;
  damageMin: number;
  damageMax: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  armourAmount: number;
  blockChance: number;
  isLegendary: boolean;
  price: number;
}

// TODO: Prorably can be the same collect rewards response
export interface ICollectCurrentDuelRewardsResponse {
  fightLog: string;
  fightWon: boolean;
  userName: string;
  userImageId: string;
  userLvl: number;
  userHealth: number;
}

export const login = async (values: IValueLogin) => {
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
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (response.status == 204) {
    throw new Error("");
  }

  const data: IFetchedUser = await response.json();

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
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (response.status == 403) {
    throw new Error("Not enough gold");
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
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (response.status == 403) {
    throw new Error("Not enough gold");
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
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (response.status == 403) {
    throw new Error("Not enough gold");
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
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (response.status == 403) {
    throw new Error("Not enough gold");
  }

  return response.status;
};

export const generateWeaponStore = async () => {
  const jwt = getUserFromStorage()!.token;

  if (!jwt) {
    return;
  }

  const response = await fetch(`${baseUrl}/shops/weapon`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.status;
};

export const generateMagicStore = async () => {
  const jwt = getUserFromStorage()!.token;

  if (!jwt) {
    return;
  }

  const response = await fetch(`${baseUrl}/shops/magic`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.status;
};

export const equipItem = async (slotKey: string) => {
  const jwt = getUserFromStorage()!.token;

  if (!jwt) {
    return;
  }

  const response = await fetch(`${baseUrl}/equip/${slotKey}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.status;
};

export const sellItem = async (slotKey: string) => {
  const jwt = getUserFromStorage()!.token;

  if (!jwt) {
    return;
  }

  const response = await fetch(`${baseUrl}/sell/${slotKey}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.status;
};

export const buyItem = async (slotKey: string, shopType: string) => {
  const jwt = getUserFromStorage()!.token;

  const url =
    shopType == "magicShop"
      ? `${baseUrl}/shops/magic/${slotKey}`
      : `${baseUrl}/shops/weapon/${slotKey}`;

  if (!jwt) {
    return;
  }

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.status;
};

export const fightPlayer = async (email: string) => {
  const jwt = getUserFromStorage()!.token;

  if (!jwt) {
    return;
  }

  const response = await fetch(`${baseUrl}/fight/${email}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const responseData: ICollectCurrentDuelRewardsResponse =
    await response.json();

  return responseData;
};

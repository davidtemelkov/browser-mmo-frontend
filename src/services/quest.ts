import { getUserFromStorage } from "../utils/localStorage";
import { IQuest } from "./user";

const baseUrl = "https://browser-mmo-backend.fly.dev/quests";
// const baseUrl = "http://localhost:8080/quests";

export interface ICollectCurrentQuestRewardsResponse {
  fightLog: string;
  fightWon: boolean;
  monsterName: string;
  monsterId: string;
  monsterLevel: number;
  monsterHealth: number;
}

export const generateQuests = async () => {
  const jwt = getUserFromStorage()!.token;

  if (!jwt) {
    return;
  }

  const response = await fetch(`${baseUrl}/generate`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.status;
};

export const setCurrentQuest = async (quest: IQuest) => {
  const jwt = getUserFromStorage()!.token;

  if (!jwt) {
    return;
  }

  const response = await fetch(`${baseUrl}/set`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ quest }),
  });

  return response.status;
};

export const cancelCurrentQuest = async () => {
  const jwt = getUserFromStorage()!.token;

  if (!jwt) {
    return;
  }

  const response = await fetch(`${baseUrl}/cancel`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.status;
};

export const collectCurrentQuestRewards = async () => {
  const jwt = getUserFromStorage()!.token;

  if (!jwt) {
    return;
  }

  const response = await fetch(`${baseUrl}/collect`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const responseData: ICollectCurrentQuestRewardsResponse =
    await response.json();

  return responseData;
};

export const resetQuests = async () => {
  const jwt = getUserFromStorage()!.token;

  if (!jwt) {
    return;
  }

  const response = await fetch(`${baseUrl}/reset`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.status;
};

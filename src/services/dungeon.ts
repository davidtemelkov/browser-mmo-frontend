import { getUserFromStorage } from "../utils/localStorage";
import { ICollectCurrentQuestRewardsResponse } from "./quest";

// TODO: 2.1 Add logic to switch between these two
const baseUrl = "https://browser-mmo-backend.fly.dev/dungeon/";
// const baseUrl = "http://localhost:8080/dungeon/";

export interface IBoss {
  id: string;
  name: string;
  lvl: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
}

export const fightDungeon = async () => {
  const jwt = getUserFromStorage()!.token;

  if (!jwt) {
    return;
  }

  const response = await fetch(`${baseUrl}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  // TODO: Change this interface
  const responseData: ICollectCurrentQuestRewardsResponse =
    await response.json();

  return responseData;
};

export const getDungeonBoss = async (position: string) => {
  const jwt = getUserFromStorage()!.token;

  if (!jwt) {
    return;
  }

  const response = await fetch(`${baseUrl}${position}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const data: IBoss = await response.json();

  return data;
};

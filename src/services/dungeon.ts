import { getUserFromStorage } from "../utils/localStorage";
import { ICollectCurrentQuestRewardsResponse } from "./quest";

const baseUrl = "https://browser-mmo-backend.fly.dev/dungeon/";

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

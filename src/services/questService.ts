import { getUserFromStorage } from "../utils/localStorage";

const baseUrl = "http://localhost:8080/quests";

export const generateQuests = async () => {
    const jwt = getUserFromStorage()!.token;
    
    if (!jwt) {
      return;
    }
  
    const response = await fetch(`${baseUrl}/generate`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
    });

    return response.status;
  };
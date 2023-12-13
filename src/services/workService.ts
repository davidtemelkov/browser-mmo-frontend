import { getUserFromStorage } from "../utils/localStorage";
import { IWork } from "./userService";

const baseUrl = "http://localhost:8080/work";

  export const setWork = async (work :IWork) => {
    const jwt = getUserFromStorage()!.token;
    
    if (!jwt) {
      return;
    }
  
    const response = await fetch(`${baseUrl}/set`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify( work ),
    });

    return response.status;
  };
  
  export const cancelWork = async () => {
    const jwt = getUserFromStorage()!.token;
    
    if (!jwt) {
      return;
    }
  
    const response = await fetch(`${baseUrl}/cancel`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
    });

    return response.status;
  };

  export const collectWorkRewards = async () => {
    const jwt = getUserFromStorage()!.token;
    
    if (!jwt) {
      return;
    }
  
    const response = await fetch(`${baseUrl}/collect`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
    });

    return response.status;
  };
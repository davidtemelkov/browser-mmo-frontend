export interface IUserData {
    token: string;
  }
  
  export const saveToStorage = (key: string, data: string) => {
    if (!data) {
      return;
    }
  
    localStorage.setItem(key, data);
  };

  export const clearStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  };

  export const getUserFromStorage = () => {
    const storageData = localStorage.getItem("user");
    
    if (!storageData) {
      return null;
    }

    return { token: storageData };
  };

  export const getNameFromStorage = () => {
    const storageData = localStorage.getItem("name");
  
    if (!storageData) {
      return "";
    }
  
    const data = JSON.parse(storageData);
  
    return data;
  };

  export const getEmailFromStorage = () => {
    const storageData = localStorage.getItem("email");
  
    if (!storageData) {
      return "";
    }
  
    const data = storageData;
  
    return data;
  };
  
  
  
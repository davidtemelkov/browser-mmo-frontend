export interface IUserData {
    token: string;
  }
  
  export const saveToStorage = (key: string, data: string) => {
    if (!data) {
      return;
    }
  
    localStorage.setItem(key, JSON.stringify(data));
  };

  export const getUserFromStorage = () => {
    const storageData = localStorage.getItem("user");
  
    if (!storageData) {
      return null;
    }
  
    const data = JSON.parse(storageData);
  
    return { token: data["jwt"] };
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
  
    const data = JSON.parse(storageData);
  
    return data;
  };
  
  
  
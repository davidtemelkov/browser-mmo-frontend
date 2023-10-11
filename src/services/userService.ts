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
  
  
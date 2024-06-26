const baseUrl = "http://localhost:8080/bosses";

export interface IBoss {
  name: string;
  imageUrl: string;
  lvl: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
}

export const getBoss = async (position: string) => {
  const response = await fetch(`${baseUrl}/${position}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const data: IBoss = await response.json();

  return data;
};

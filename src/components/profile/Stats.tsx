import { FC } from "react";
import {
  IFetchedUser,
  upgradeConstitution,
  upgradeDexterity,
  upgradeIntelligence,
  upgradeStrength,
} from "../../services/user";

type StatsProps = {
  user: IFetchedUser;
  setUser: React.Dispatch<React.SetStateAction<IFetchedUser>>;
  userIsPlayer: boolean;
};

const BASE_EXP = 100.0;
const EXP_EXPONENT = 1.5;

export const Stats: FC<StatsProps> = ({ user, setUser, userIsPlayer }) => {
  //TODO: use the response to change the gold
  const increaseStrength = async () => {
    const resp = await upgradeStrength();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        totalStrength: prevUser.totalStrength + 1,
        gold: prevUser.gold - prevUser.strength,
      }));
    }
  };

  const increaseDexterity = async () => {
    const resp = await upgradeDexterity();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        totalDexterity: prevUser.totalDexterity + 1,
        gold: prevUser.gold - prevUser.dexterity,
      }));
    }
  };

  const increaseConstitution = async () => {
    const resp = await upgradeConstitution();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        totalConstitution: prevUser.totalConstitution + 1,
        gold: prevUser.gold - prevUser.constitution,
      }));
    }
  };

  const increaseIntelligence = async () => {
    const resp = await upgradeIntelligence();

    if (resp) {
      setUser((prevUser) => ({
        ...prevUser,
        totalIntelligence: prevUser.totalIntelligence + 1,
        gold: prevUser.gold - prevUser.intelligence,
      }));
    }
  };

  function CalculateExpForLvlUp(lvl: number) {
    return Math.floor(BASE_EXP * Math.pow(lvl, EXP_EXPONENT));
  }

  return (
    <div className="p-4 rounded-md  flex flex-col w-1/2 h-[100%]">
      <div className="flex rounded-md w-full h-[25%]">
        <div className="w-[27%]">
          <img
            src={user?.imageURL}
            alt={user?.name}
            className="w-full rounded-md"
          />
        </div>
        <div className="flex">
          <div className="ml-5 h-[100%] w-full flex flex-col">
            <table className="w-full table">
              <tr className=" table-row items-baseline  space-x-4">
                <td className="font-semibold text-[125%]">Name</td>
                <td className="font-semibold text-[110%] pl-9">{user?.name}</td>
              </tr>
              <tr className="table-row items-baseline  space-x-4">
                <td className="font-semibold text-[125%]">Level</td>
                <td className="font-semibold text-[110%] pl-9">{user?.lvl}</td>
              </tr>
              <tr className="table-row items-baseline  space-x-4">
                <td className="font-semibold text-[125%]">Experience</td>
                <td className="font-semibold text-[110%] pl-9">
                  {user.EXP}/{CalculateExpForLvlUp(user.lvl)}
                </td>
              </tr>
              <tr className="table-row items-baseline  space-x-4">
                <td className="font-semibold text-[125%]">BigDPoints</td>
                <td className="font-semibold text-[110%] pl-9">
                  {user?.bigDPoints}
                </td>
              </tr>
              <tr className="table-row items-baseline  space-x-4">
                <td className="font-semibold text-[125%]">Ranking</td>
                <td className="font-semibold text-[110%] pl-9">1</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div className="h-[75%]">
        <div className="rounded-md p-3 h-[25%]">
          <p className="text-xl font-bold">Strength</p>
          <div className="flex justify-end items-center">
            <p className="text-l font-semibold">{user.totalStrength}</p>
            {userIsPlayer && (
              <button
                disabled={user.gold < user.strength}
                onClick={() => increaseStrength()}
                className="border ml-3 p-1 w-[8%] h-[8%] rounded-md bg-green-200 border-blue-300"
              >
                +
              </button>
            )}
          </div>
          <p className="ml-[45%]">{`Damage: ${Math.floor(
            user.damageMin + user.totalStrength / 2
          )}/${user.damageMax + user.totalStrength / 2}`}</p>
        </div>
        <div className="rounded-md p-3 h-[25%]">
          <p className="text-xl font-bold">Dexterity</p>
          <div className="flex justify-end items-center">
            <p className="text-l font-semibold">{user.totalDexterity}</p>
            {userIsPlayer && (
              <button
                onClick={() => increaseDexterity()}
                className="border ml-3 p-1 w-[8%] h-[8%] rounded-md bg-green-200 border-blue-300"
              >
                +
              </button>
            )}
          </div>
          <p className="ml-[45%]">{`Crit: ${(
            user.totalDexterity * 0.01
          ).toFixed(2)}%`}</p>
        </div>
        <div className="rounded-md p-3 h-[25%]">
          <p className="text-xl font-bold">Constitution</p>
          <div className="flex justify-end items-center">
            <p className="text-l font-semibold">{user?.totalConstitution}</p>
            {userIsPlayer && (
              <button
                onClick={() => increaseConstitution()}
                className="border ml-3 p-1 w-[8%] h-[8%] rounded-md bg-green-200 border-blue-300"
              >
                +
              </button>
            )}
          </div>
          <p className="ml-[45%]">{`Life: ${100 + user.totalConstitution}`}</p>
        </div>
        <div className="rounded-md p-3 h-[25%]">
          <p className="text-xl font-bold">Intelligence</p>
          <div className="flex justify-end items-center">
            <p className="text-l font-semibold">{user?.totalIntelligence}</p>
            {userIsPlayer && (
              <button
                onClick={() => increaseIntelligence()}
                className="border ml-3 p-1 w-[8%] h-[8%] rounded-md bg-green-200 border-blue-300"
              >
                +
              </button>
            )}
          </div>
          <p className="ml-[45%]">{`Fireball: ${user.totalIntelligence}`}</p>
        </div>
      </div>
    </div>
  );
};

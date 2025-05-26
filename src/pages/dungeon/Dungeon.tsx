import { FC, useEffect, useState } from "react";
import { Fight } from "../../components/fight";
import { useUser } from "../../contexts/userContext";
import { IBoss, getDungeonBoss } from "../../services/dungeon";

export const Dungeon: FC = () => {
  const { user } = useUser();
  const [boss, setBoss] = useState<IBoss>({
    id: "",
    name: "",
    lvl: "",
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
  });
  const [rerender, setRerender] = useState<boolean>(false);
  const [fightEnded, setFightEnded] = useState<boolean>(false);
  const [fightWon, setFightWon] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFightStarted, setIsFightStarted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDungeonBoss(user.dungeon.toString());
      setBoss({
        id: response!.id, // TODO: Why are these erroring without !
        name: response!.name,
        lvl: response!.lvl,
        strength: response!.strength,
        dexterity: response!.dexterity,
        constitution: response!.constitution,
        intelligence: response!.intelligence,
      });
    };

    fetchData();
  }, [rerender]);

  const handleButtonClick = () => {
    if (isFightStarted) {
      setIsFightStarted(false);
      setRerender(!rerender);
    } else {
      setIsFightStarted(true);
    }
  };

  return (
    <div className="flex flex-col items-center h-full bg-blue-200 bg-opacity-60">
      {isFightStarted ? (
        <>
          <Fight
            type="dungeon"
            user={user}
            setFightEnded={setFightEnded}
            setFightWon={setFightWon}
            setIsLoaded={setIsLoaded}
          />
          <div className="flex flex-col items-center mt-10 w-full">
            {fightEnded === true && (
              <>
                {fightWon && isLoaded ? (
                  <p className="text-[1.25rem] font-semibold">
                    You beat the boss
                  </p>
                ) : (
                  <p className="text-[1.25rem] font-semibold mb-[1%]">
                    You died xD
                  </p>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        // TODO: Add dungeoon position somewhere
        <div className="flex justify-between items-center min-h-2/3 w-full">
          <img
            className="max-w-[30%] max-h-[70%] ml-10"
            src={`/images/${boss.id}.png`}
          />
          <table className="w-[20%] table mr-[7rem]">
            <tbody>
              <tr className="table-row items-baseline space-x-4">
                <td className="font-semibold text-[125%]">Name</td>
                <td className="font-semibold text-[110%] pl-9">{boss.name}</td>
              </tr>
              <tr className="table-row items-baseline space-x-4">
                <td className="font-semibold text-[125%]">Level</td>
                <td className="font-semibold text-[110%] pl-9">{boss.lvl}</td>
              </tr>
              <tr className="table-row items-baseline space-x-4">
                <td className="font-semibold text-[125%]">Strength</td>
                <td className="font-semibold text-[110%] pl-9">
                  {boss.strength}
                </td>
              </tr>
              <tr className="table-row items-baseline space-x-4">
                <td className="font-semibold text-[125%]">Dexterity</td>
                <td className="font-semibold text-[110%] pl-9">
                  {boss.dexterity}
                </td>
              </tr>
              <tr className="table-row items-baseline space-x-4">
                <td className="font-semibold text-[125%]">Constitution</td>
                <td className="font-semibold text-[110%] pl-9">
                  {boss.constitution}
                </td>
              </tr>
              <tr className="table-row items-baseline space-x-4">
                <td className="font-semibold text-[125%]">Intelligence</td>
                <td className="font-semibold text-[110%] pl-9">
                  {boss.intelligence}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center items-end h-1/3 w-full">
        <button
          onClick={handleButtonClick}
          className="border border-blue-300 rounded-md p-2 text-center bg-blue-300 w-fit h-fit mb-10"
        >
          {isFightStarted ? "Collect" : "Fight"}
        </button>
      </div>
    </div>
  );
};

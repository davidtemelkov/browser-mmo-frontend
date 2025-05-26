import { FC, useEffect, useState } from "react";
import { getUser } from "../../services/user";
import { getEmailFromStorage } from "../../utils/localStorage";
import { generateQuests, resetQuests } from "../../services/quest";
import {
  CollectQuestReward,
  CurrentQuest,
  QuestsComponent,
} from "../../components/quests";
import { getCurrentDate } from "../../utils/date";
import { useUser } from "../../contexts/userContext";

export const Quests: FC = () => {
  const { user, setUser } = useUser();
  const [rerender, setRerender] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(getEmailFromStorage()!);
      setUser(fetchedUser!);

      if (fetchedUser!.quests.Quest0.id === "") {
        await generateQuests();
        setRerender(!rerender);
      }

      if (fetchedUser!.lastPlayedDate !== getCurrentDate()) {
        await resetQuests();
        await generateQuests();
        setRerender(!rerender);
      }
    };

    fetchData();
  }, [rerender]);

  let questingUntilUTC = 0;

  if (user.questingUntil !== "") {
    const questingUntil = user.questingUntil;
    const [datePart, timePart] = questingUntil.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    questingUntilUTC = Date.UTC(year, month - 1, day, hour, minute, second);
  }

  const currentUTC = Date.now();

  const isQuestExpired =
    user.questingUntil !== "" ? questingUntilUTC <= currentUTC : false;

  if (isQuestExpired) {
    return (
      <CollectQuestReward
        user={user}
        setUser={setUser}
        rerender={rerender}
        setRerender={setRerender}
      />
    );
  }

  if (user.isQuesting) {
    return (
      <CurrentQuest user={user} rerender={rerender} setRerender={setRerender} />
    );
  }

  return (
    <QuestsComponent
      user={user}
      rerender={rerender}
      setRerender={setRerender}
    />
  );
};

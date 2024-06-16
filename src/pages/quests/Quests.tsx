import { FC, useEffect, useState } from "react";
import { getUser } from "../../services/userService";
import { getEmailFromStorage } from "../../utils/localStorage";
import { generateQuests, resetQuests } from "../../services/questService";
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

      if (fetchedUser!.quests.Quest0.ImageURL === "") {
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

  const isQuestExpired = new Date(user.questingUntil).getTime() <= Date.now();
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

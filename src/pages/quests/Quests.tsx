import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IFetchedUser, getUser, initalUser } from "../../services/userService";
import { getEmailFromStorage } from "../../utils/localStorage";
import { generateQuests } from "../../services/questService";
import {
  CollectQuestReward,
  CurrentQuest,
  QuestsComponent,
} from "../../components/quests";

export const Quests: FC = () => {
  const [user, setUser] = useState<IFetchedUser>(initalUser);
  const [rerender, setRerender] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(getEmailFromStorage()!);
      setUser(fetchedUser!);

      if (fetchedUser!.quests.Quest0.ImageURL === "") {
        await generateQuests();
        setRerender(!rerender);
      }
    };

    fetchData();
  }, [rerender]);

  if (user.isWorking) {
    navigate("/work");
  }

  const isQuestExpired = new Date(user.questingUntil).getTime() <= Date.now();
  if (isQuestExpired) {
    return (
      <CollectQuestReward
        user={user}
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

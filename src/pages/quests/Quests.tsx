import { FC, useEffect, useState } from "react";
import { IFetchedUser, getUser, initalUser } from "../../services/userService";
import { getEmailFromStorage } from "../../utils/localStorage";
import { generateQuests } from "../../services/questService";
import { CurrentQuest, QuestsComponent } from "../../components/quests";

export const Quests: FC = () => {
  const [user, setUser] = useState<IFetchedUser>(initalUser);
  const [rerender, setRerender] = useState<boolean>(false);

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

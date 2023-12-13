import { FC, useEffect, useState } from "react";
import { IFetchedUser, getUser, initalUser } from "../../services/userService";
import { getEmailFromStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import {
  CollectWorkRewards,
  CurrentWork,
  WorkComponent,
} from "../../components/work";

export const Work: FC = () => {
  const [user, setUser] = useState<IFetchedUser>(initalUser);
  const [rerender, setRerender] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(getEmailFromStorage()!);
      setUser(fetchedUser!);
    };

    fetchData();
  }, [rerender]);

  if (user.isQuesting) {
    navigate("/quests");
  }

  const isWorkExpired = new Date(user.workingUntil).getTime() <= Date.now();
  if (isWorkExpired) {
    return (
      <CollectWorkRewards
        user={user}
        rerender={rerender}
        setRerender={setRerender}
      />
    );
  }

  if (user.isWorking) {
    return (
      <CurrentWork user={user} rerender={rerender} setRerender={setRerender} />
    );
  }

  return (
    <WorkComponent user={user} rerender={rerender} setRerender={setRerender} />
  );
};

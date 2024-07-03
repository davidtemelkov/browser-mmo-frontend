import { FC, useEffect, useState } from "react";
import { getUser } from "../../services/user";
import { getEmailFromStorage } from "../../utils/localStorage";
import {
  CollectWorkRewards,
  CurrentWork,
  WorkComponent,
} from "../../components/work";
import { useUser } from "../../contexts/userContext";

export const Work: FC = () => {
  const { user, setUser } = useUser();
  const [rerender, setRerender] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser(getEmailFromStorage()!);
      setUser(fetchedUser!);
    };

    fetchData();
  }, [rerender]);

  const isWorkExpired = new Date(user.workingUntil).getTime() <= Date.now();
  if (isWorkExpired) {
    return (
      <CollectWorkRewards
        user={user}
        setUser={setUser}
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

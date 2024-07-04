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

  let workingUntilUTC = 0;

  if (user.workingUntil !== "") {
    const workingUntil = user.workingUntil;
    const [datePart, timePart] = workingUntil.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    workingUntilUTC = Date.UTC(year, month - 1, day, hour, minute, second);
  }

  const currentUTC = Date.now();

  const isWorkExpired =
    user.workingUntil !== "" ? workingUntilUTC <= currentUTC : false;

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

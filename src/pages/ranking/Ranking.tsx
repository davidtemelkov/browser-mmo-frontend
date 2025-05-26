import { FC } from "react";
import { useNavigate } from "react-router-dom";

// TODO: Implement this page properly
export const Ranking: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/profile/misc@abv.bg")}>Jotaro</button>
      <button onClick={() => navigate("/profile/miscish@abv.bg")}>Dio</button>
    </div>
  );
};

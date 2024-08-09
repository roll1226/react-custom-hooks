import { FC } from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

const UseOnlineStatus: FC = () => {
  const online = useOnlineStatus();

  return <div>{online ? "online" : "offline"}</div>;
};

export default UseOnlineStatus;

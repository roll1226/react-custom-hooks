import { FC } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

const UseMediaQuery: FC = () => {
  const isLarge = useMediaQuery("(min-width: 600px)");
  return <div>Large: {isLarge.toString()}</div>;
};

export default UseMediaQuery;

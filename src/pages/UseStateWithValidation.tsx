import { FC } from "react";
import { useStateWithValidation } from "../hooks/useStateWithValidation";

const UseStateWithValidation: FC = () => {
  const [username, setUsername, isValid] = useStateWithValidation<string>(
    (name) => name.length > 5,
    ""
  );

  return (
    <>
      <div>Valid: {isValid.toString()}</div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </>
  );
};

export default UseStateWithValidation;

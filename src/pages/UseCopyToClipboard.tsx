import { FC } from "react";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

const UseCopyToClipboard: FC = () => {
  const [copyToClipboard, { success }] = useCopyToClipboard();
  return (
    <div>
      <button onClick={() => copyToClipboard("This was copied")}>
        {success ? "Copied" : "Copy Text"}
      </button>
      <input type="text" />
    </div>
  );
};

export default UseCopyToClipboard;

import { useState } from "react";
import { useTimeout } from "./useTimeout";

type CopyToClipboardOptions = {
  debug?: boolean;
  message?: string;
};

type CopyType = (text: string, options?: CopyToClipboardOptions) => boolean;

type UseCopyToClipboardReturn = [
  (text: string, options?: CopyToClipboardOptions) => void,
  { value: string | undefined; success: boolean | undefined }
]

type UseCopyToClipboard = () =>  UseCopyToClipboardReturn;

const copy: CopyType = (text, options) => {
  try {
    navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    if (options?.debug) {
      console.error(options.message || "Copy failed", error);
    }
    return false;
  }
};

export const useCopyToClipboard: UseCopyToClipboard = () => {
  const [value, setValue] = useState<string>();
  const [success, setSuccess] = useState<boolean>();

  const { reset } = useTimeout(() => setSuccess(false), 3000);

  const copyToClipboard = (text: string, options?: CopyToClipboardOptions) => {
    const result = copy(text, options);
    if (result) setValue(text);
    setSuccess(result);
    reset();
  };

  return [copyToClipboard, { value, success }];
};

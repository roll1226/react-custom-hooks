import { useState } from "react";
import useTimeout from "./useTimeout";

interface CopyToClipboardOptions {
  debug?: boolean;
  message?: string;
}

const copy = (text: string, options?: CopyToClipboardOptions): boolean => {
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

export const useCopyToClipboard = (): [
  (text: string, options?: CopyToClipboardOptions) => void,
  { value: string | undefined; success: boolean | undefined }
] => {
  const { reset } = useTimeout(() => setSuccess(false), 3000);

  const [value, setValue] = useState<string>();
  const [success, setSuccess] = useState<boolean>();

  const copyToClipboard = (text: string, options?: CopyToClipboardOptions) => {
    const result = copy(text, options);
    if (result) setValue(text);
    setSuccess(result);
    reset();
  };

  return [copyToClipboard, { value, success }];
};

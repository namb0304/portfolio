import { useState, useCallback } from 'react';

interface UseCopyToClipboardReturn {
  isCopied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
}

export const useCopyToClipboard = (resetDelay = 2500): UseCopyToClipboardReturn => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, resetDelay);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }, [resetDelay]);

  return { isCopied, copyToClipboard };
};

import { useState, useCallback, useRef } from "react";

/**
 * Custom hook to toggle password visibility and maintain focus
 * @returns {[boolean, () => void, React.RefObject<HTMLInputElement>]}
 */
export function usePasswordToggle(): [
  boolean,
  () => void,
  React.RefObject<HTMLInputElement>
] {
  const [isVisible, setIsVisible] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);

    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 0);
  }, []);

  return [isVisible, toggleVisibility, passwordInputRef];
}

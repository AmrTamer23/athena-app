import { useCallback, useState } from "react";

export function usePasswordVisibility() {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = useCallback(() => setIsVisible((v) => !v), []);
  const inputType = isVisible ? "text" : "password";
  return { isVisible, toggle, inputType } as const;
}



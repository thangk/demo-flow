// Source1: https://usehooks.com/useHover/
// Source2: https://www.youtube.com/watch?v=SbTMcDc6JaI (modified version of Source1 for tsx)

import { RefObject, useEffect, useState } from 'react'

// Hook
export const useHover = <T extends HTMLElement>(ref: RefObject<T>) => {
    
    const [value, setValue] = useState(false);
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(
      () => {
        const node = ref.current;
        if (node) {
          node.addEventListener("mouseover", handleMouseOver);
          node.addEventListener("mouseout", handleMouseOut);
          return () => {
            node.removeEventListener("mouseover", handleMouseOver);
            node.removeEventListener("mouseout", handleMouseOut);
          };
        }
      },
      [ref.current] // Recall only if ref changes
    );
    return [ref, value];
  }
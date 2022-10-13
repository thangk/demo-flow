// Source1: https://usehooks.com/useOnClickOutside/
// This is a modified version of hook above for TSX
// Source2: https://www.youtube.com/watch?v=SbTMcDc6JaI

import { RefObject, useEffect } from 'react'

type Event = MouseEvent | TouchEvent

// Hook
export const useOnClickOutside = <T extends HTMLElement>(ref: RefObject<T>, handler: (event: Event) => void) => {
    useEffect(
      () => {
        const listener = (event: Event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event?.target as Node)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }
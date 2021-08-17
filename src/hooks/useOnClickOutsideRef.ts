import { useEffect, useRef } from 'react';

/**
 * Hook to handle capturing clicking outside of a target element
 * @param onClickOutside The event handler called when clicking outside of the target element
 * @returns The React ref to be attached to the target element
 */
export default function useOnClickOutsideRef<T extends HTMLElement>(
  onClickOutside: (evt: MouseEvent) => void,
): React.RefObject<T> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const onDocumentClicked = (evt: MouseEvent) => {
      let target = evt.target as T | HTMLElement | null;

      while (target) {
        if (target === elementRef.current) {
          return;
        }

        target = target.parentElement;
      }
      onClickOutside(evt);
    };

    document.addEventListener('click', onDocumentClicked);
    return () => {
      document.removeEventListener('click', onDocumentClicked);
    };
  }, [onClickOutside]);

  return elementRef;
}

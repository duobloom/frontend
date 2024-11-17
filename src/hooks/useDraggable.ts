import { useDrag } from "@use-gesture/react";
import { RefObject, useEffect } from "react";

export const useDraggable = (ref: RefObject<HTMLElement>) => {
  // ref 요소에 touch-action: none 스타일 적용
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.touchAction = "none";

    // cleanup 함수
    return () => {
      el.style.touchAction = "auto";
    };
  }, [ref]);

  const getDraggableOptions = useDrag(
    ({ event, delta: [x] }) => {
      event.preventDefault();

      const el = ref.current;
      if (!el) return;

      el.scrollBy(-x, 0);
    },
    { filterTaps: true },
  );

  return getDraggableOptions;
};

export default useDraggable;

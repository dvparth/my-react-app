import { useEffect, useRef } from "react";

export const useRenderCount = (
  counterName = "",
  consoleLogging = false,
  initialValue = 0
) => {
  const renderCount = useRef(initialValue + 1);
  useEffect(() => {
    if (consoleLogging)
      console.info(`render count of ${counterName} is ${renderCount.current}`);
    renderCount.current = renderCount.current + 1;
  });
  return renderCount.current;
};

import * as React from "react";

type UseCountdownOptions = {
  onExpire?: () => void;
};

/** Ticks a countdown down to 0 every second, restarting `onExpire` when it hits 0. */
export function useCountdown(seconds: number, { onExpire }: UseCountdownOptions = {}) {
  const [remaining, setRemaining] = React.useState(seconds);
  const onExpireRef = React.useRef(onExpire);

  React.useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  React.useEffect(() => {
    if (remaining <= 0) {
      onExpireRef.current?.();
      return;
    }
    const timer = setInterval(() => setRemaining((current) => current - 1), 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  const restart = React.useCallback(() => setRemaining(seconds), [seconds]);

  return { remaining, restart };
}

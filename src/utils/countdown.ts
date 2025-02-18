import { useState, useEffect } from 'react';

const LAUNCH_DATE = new Date('2025-03-08T15:00:00Z');

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +LAUNCH_DATE - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

export function formatNumber(num: number): string {
  return num.toString().padStart(2, '0');
}
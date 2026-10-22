'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function Counter({
  value,
  duration = 2,
  delay = 0,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [count, setCount] = useState<number>(0);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  // Parse prefix, numeric target, suffix (e.g. "5+", "100+", "50+")
  const { prefix, target, suffix, isNumber, decimals } = useMemo(() => {
    const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) {
      return { prefix: '', target: 0, suffix: value, isNumber: false, decimals: 0 };
    }
    const numStr = match[2];
    const decParts = numStr.split('.');
    const decimals = decParts.length > 1 ? decParts[1].length : 0;
    return {
      prefix: match[1] || '',
      target: parseFloat(numStr),
      suffix: match[3] || '',
      isNumber: true,
      decimals,
    };
  }, [value]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !isInView || !isNumber) return;

    let animationFrameId: number;
    const timeoutId = setTimeout(() => {
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = (currentTime - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth luxury easeOutExpo curve: 1 - 2^(-10 * t)
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = eased * target;

        if (decimals > 0) {
          setCount(parseFloat(current.toFixed(decimals)));
        } else {
          setCount(Math.round(current));
        }

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasMounted, isInView, target, duration, delay, isNumber, decimals]);

  if (!isNumber) {
    return <span className={className}>{value}</span>;
  }

  // Prevent SSR hydration mismatch
  if (!hasMounted) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const formattedCount = decimals > 0 ? count.toFixed(decimals) : count.toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {isInView ? formattedCount : 0}
      {suffix}
    </span>
  );
}

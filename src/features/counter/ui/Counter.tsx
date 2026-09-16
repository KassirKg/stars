'use client';
import { Minus, Plus } from 'lucide-react';

import styles from './Counter.module.scss';

interface CounterProps {
  count: number;
  setCount: (value: number) => void;
  max?: number;
}

function Counter({ count = 1, setCount, max }: CounterProps) {
  const limit = typeof max === 'number' && Number.isFinite(max) ? Math.max(max, 1) : Infinity;

  const increment = () => {
    setCount(Math.min(count + 1, limit));
  };

  const decrement = () => {
    setCount(Math.max(count - 1, 1));
  };

  return (
    <div className={styles.counter}>
      <button type="button" onClick={decrement} disabled={count <= 1} aria-label="minus">
        <Minus size={20} />
      </button>
      <span>{count}</span>
      <button type="button" onClick={increment} disabled={count >= limit} aria-label="plus">
        <Plus size={20} />
      </button>
    </div>
  );
}

export default Counter;

import { useState } from 'react';

export interface Props {
  initialCount?: number;
  step?: number;
  color?: string;
}

export default function ReactCounter({ initialCount = 0, step = 1, color = 'blue' }: Props) {
  const [count, setCount] = useState(initialCount);

  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
    green: 'bg-green-500 hover:bg-green-600 text-white',
    red: 'bg-red-500 hover:bg-red-600 text-white',
    purple: 'bg-purple-500 hover:bg-purple-600 text-white',
  };

  const buttonClass = `px-4 py-2 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`;

  return (
    <div className="flex items-center gap-4">
      <button className={buttonClass} onClick={() => setCount(count - step)}>
        -
      </button>
      <span className="text-2xl font-bold min-w-[3rem] text-center">{count}</span>
      <button className={buttonClass} onClick={() => setCount(count + step)}>
        +
      </button>
    </div>
  );
}

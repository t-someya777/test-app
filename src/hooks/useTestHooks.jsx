import { useState } from "react";

export default function useTestHooks() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(prev => prev + 1);

  const handleDecrement = () => setCount(prev => prev - 1);

  return [count, {setCount, handleIncrement, handleDecrement} ];
}
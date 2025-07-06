import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, reset } from "./counterSlice";
import { useState } from "react";
const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);
  const inputValue = Number(incrementAmount) || 0;

  const setReset = () => {
    dispatch(reset());
    dispatch(incrementByAmount(0));
    setIncrementAmount(0);
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center gap-4 min-w-[250px] border border-gray-300">
        <h1 className="text-2xl font-bold text-gray-800">Redux Counter</h1>
        <div className="text-4xl font-semibold text-blue-600">{count}</div>
        <div className="flex gap-4">
          <button
            onClick={() => dispatch(increment())}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-lg">
            +
          </button>
          <button
            onClick={() => dispatch(decrement())}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-lg">
            -
          </button>
        </div>

        <input
          type="number"
          value={incrementAmount}
          onChange={(e) => {
            setIncrementAmount(e.target.value);
          }}
          className="border border-gray-400 rounded-md px-3 py-1 mt-4 text-center"
        />
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => dispatch(incrementByAmount(inputValue))}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">
            Add Amount
          </button>
          <button onClick={() => setReset()}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Counter;

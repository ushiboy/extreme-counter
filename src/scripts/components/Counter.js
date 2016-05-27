import React from 'react';

export default function Counter(props) {
  return (
    <div>
      <div>{props.count}</div>
      <button onClick={props.onPlusClick} disabled={!props.enablePlus}>+</button>
      <button onClick={props.onMinusClick} disabled={!props.enableMinus}>-</button>
    </div>
  );
}

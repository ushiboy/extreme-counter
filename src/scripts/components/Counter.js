import React from 'react';

export default function Counter(props) {
  return (
    <div>
      <div>{props.count}</div>
      <button onClick={props.onPlusClick}>+</button>
      <button onClick={props.onMinusClick}>-</button>
    </div>
  );
}

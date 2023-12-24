import React from 'react';
import clsx from 'clsx';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  color?: 'blue' | 'green';
  ripple?: boolean;
}

export function Checkbox(props: CheckboxProps) {
  const { checked, onChange, children, color = 'blue', ripple = true } = props;

  return (
    <label className="inline-flex items-center mx-auto w-64">
      <div className={clsx('inline-flex relative justify-center items-center cursor-pointer group', 'md:text-red-500')}>
        <input
          id="test"
          type="checkbox"
          className={clsx('peer sr-only', { 'bg-red-300': !checked && ripple })}
          checked={checked}
          onChange={onChange}
          color={color}
          required
        />
        <div
          className={clsx('h-6 w-6 bg-gray-100 border-gray-500 border-3 rounded', {
            'peer-checked:bg-blue-500 peer-checked:border-blue-500': color === 'blue',
            'peer-checked:bg-green-500 peer-checked:border-green-500': color === 'green',
          })}
        ></div>
      </div>
      {children}
    </label>
  );
}
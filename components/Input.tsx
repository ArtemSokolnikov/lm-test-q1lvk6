import React from 'react';
import clsx from 'clsx';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: 'blue' | 'green';
  className?: string;
  id?: string;
  placeholder?: string;
}

export function Input(props: InputProps) {
  const { value, onChange, color = 'blue', className, id, placeholder = 'Standard' } = props;
  const isGreen = color === 'green';

  return (
    <div className="mx-auto h-8 w-64">
      <label className="relative justify-center items-center">
        <div className="">
          <input
            type="text"
            pattern="[A-Za-z]{4,8}"
            className={clsx(
              'peer placeholder-transparent outline-none absolute border border-1 border-t-0 border-r-0 border-l-0 border-b-slate-500 hover:border-b-slate-800 hover:border-b-2 focus:border-b-2',
              {
                'focus:border-b-green-500': isGreen,
                'focus:border-b-blue-500': !isGreen,
              }
            )}
            id={id}
            color={color}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <div
            className={clsx(
              'absolute cursor-text top-2 left-0 text-gray-500 text-xs transition-all -translate-y-6 peer-focus:-translate-y-6 peer-placeholder-shown:-translate-y-1/2 peer-focus:text-xs peer-placeholder-shown:text-base peer-focus:text-',
              {
                'green-500': isGreen,
                'blue-500': !isGreen,
              }
            )}
          >
            {placeholder}
          </div>
        </div>
      </label>
    </div>
  );
}
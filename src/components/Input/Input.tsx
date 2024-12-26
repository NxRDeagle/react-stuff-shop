import React from 'react';
import { FieldPath, FieldValues, Control, useWatch, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  label: string;
  name: FieldPath<T>;
  type?: string;
  required?: boolean;
  error?: string;
  register: UseFormRegister<T>;
  control: Control<T>;
}

export const Input = <T extends FieldValues>({
  label,
  type = 'text',
  required = false,
  error,
  register,
  control,
  name,
  ...rest
}: InputProps<T>) => {
  const value = useWatch({
    control,
    name,
  });

  return (
    <div className="mb-5">
      <div className="relative w-full">
        <input
          type={type}
          {...register(name)}
          placeholder=" "
          className={`w-full bg-heroGray py-3 pl-6 outline-none border rounded-md text-sm placeholder-transparent text-white focus:border-[#6C3EB8] focus:ring-0 peer
                        ${error ? 'border-red-400' : 'border-transparent'}`}
          {...rest}
          required={required}
        />
        <label
          className={`absolute text-white top-1/2 left-6 transform -translate-y-1/2 transition-all duration-300 text-sm pointer-events-none
                        peer-focus:-top-2 peer-focus:left-5 peer-focus:text-xs
                        ${value ? '!-top-2' : ''}
                        ${value ? '!left-5' : ''}
                        ${value ? '!text-xs' : ''}`}>
          {label}
        </label>
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

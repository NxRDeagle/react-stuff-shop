import React from 'react';

interface SizeRadioProps {
  size: string;
  selectedSize: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SizeRadio: React.FC<SizeRadioProps> = ({ size, selectedSize, onChange }) => {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name="size"
        value={size}
        checked={selectedSize === size}
        onChange={onChange}
        className="hidden peer"
      />
      <div className="py-1 px-2 flex items-center justify-center rounded-lg bg-gray-800 peer-checked:bg-purple-600 text-heroWhite text-sm transition-bg duration-300 hover:bg-buttonPink hover:bg-opacity-60">
        {size}
      </div>
    </label>
  );
};

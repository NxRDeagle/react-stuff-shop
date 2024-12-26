import React from 'react';
import { Button } from '../Button/Button';

interface SaleAddProps {
  title: string;
  imgRight: string;
  imgLeftF: string;
  imgLeftS: string;
  saveMoney: string;
}

export const SaleAdd: React.FC<SaleAddProps> = ({
  title,
  imgRight,
  imgLeftF,
  imgLeftS,
  saveMoney,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center rounded-md">
      {/* Left Side Container */}
      <div className="w-full md:w-1/2 h-auto xs:h-[450px] bg-customGray flex flex-col justify-between relative">
        <div className="flex justify-center flex-col items-center h-full">
          <div className="pt-[74px] uppercase text-buttonPink text-5xl drawer-full:text-7xl font-light text-center">
            <h2 className="leading-[85px]">{title}</h2>
            <h2 className="text-7xl drawer-full:text-[150px] mb-7 leading-[182px]">sale</h2>
          </div>
          <Button className="mb-5 z-20 relative">See more</Button>
        </div>
        {/* Positioning the images */}
        <img
          className="scale-75 opacity-80 xs:opacity-100 xs:scale-100 absolute bottom-[70px] -left-20 z-10"
          src={imgLeftF}
          alt="Left Image"
        />
        <img
          className="scale-75 opacity-80 xs:opacity-100 xs:scale-100 absolute -bottom-[26px] right-0 z-10"
          src={imgLeftS}
          alt="Right Image"
        />
      </div>

      {/* Right Side Container */}
      <div className="w-full md:w-1/2 h-auto xs:h-[450px] flex justify-center items-center">
        <img className="w-full h-full object-cover" src={imgRight} alt="Image" />
      </div>
    </div>
  );
};

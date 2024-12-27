import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="bg-customGray flex-1 h-[423px] rounded-md mb-5 navInputHide:min-w-[400px]">
      <span className="font-black text-4xl xs:text-5xl sm:text-[50px]  customMl:text-[70px] flex justify-center select-none leading-[145px] text-heroGray text-nowrap mb-2">
        BIG SALE 20%
      </span>
      <div className="p-5 relative">
        <span className="relative z-20 uppercase font-medium leading-5 text-lg text-heroLightGray">
          the bestseller of 2022{' '}
        </span>
        <h3 className="relative z-20 text-heroWhite text-2xl xs:text-[42px] mb-6 leading-[51px] font-bold max-w-[481px]">
          LENNON r2d2 with NVIDIA 5090 TI
        </h3>
        <Link to={'/shop'} className="relative z-20">
          <Button>Shop Now</Button>
        </Link>
        <img
          className="absolute right-0 -bottom-6 xs:-bottom-20   opacity-30 heroOpacity:opacity-100 max-w-full xs:max-w-[80%] drawer-full:max-w-[64%] navInputHide:max-w-[55%]"
          src="images/computer.png"
          alt="Computer"
        />
      </div>
    </div>
  );
};

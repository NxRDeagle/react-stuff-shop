export const Loading = () => {
  return (
    <div className="flex flex-grow gap-[10px] items-center justify-center ">
      <div className="w-[10px] h-[10px] bg-categoriesPink rounded-[50%]  animate-bounce-alternate"></div>
      <div className="w-[10px] h-[10px] bg-categoriesPink rounded-[50%] animate-bounce-alternate-delay-100"></div>
      <div className="w-[10px] h-[10px] bg-categoriesPink rounded-[50%]  animate-bounce-alternate-delay-200"></div>
    </div>
  );
};

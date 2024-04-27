import React from "react";

type Props = {
    children: React.ReactNode; 
};

function Title({ children }: Props) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl md:text-4xl font-semibold lowercase">{children}</p>
      <div className="mt-4 w-32 border-b-2 border-primary-subtle"></div>
    </div>
  );
}

export default Title;

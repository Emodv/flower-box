import React from "react";

type Props = {
  children: React.ReactNode;
};

function tag({ children }: Props) {
  return <span className="rounded-md px-2 py-[4px] bg-primary text-white">{children}</span>;
}

export default tag;

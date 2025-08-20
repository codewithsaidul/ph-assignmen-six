import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow-1 container mx-auto px-4 py-16">{children}</div>
    </div>
  );
};

export default CommonLayout;
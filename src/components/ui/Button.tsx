import { ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  buttonType?: 'button' | 'submit' | 'reset';
};

function Button({ onClick, children, buttonType }: ButtonProps) {
  return (
    <button
      type={buttonType}
      onClick={onClick}
      className="bg-bgBlue hover:bg-bgDarkBlue text-white rounded-md
      md:text-sm text-xs font-semibold py-2 px-4 flex items-center gap-x-1"
    >
      {children}
    </button>
  );
}

export default Button;

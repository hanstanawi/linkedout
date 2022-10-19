import cx from 'classnames';
import { ReactNode } from 'react';

type Layout = 'full' | 'partial';

type ActionType = 'primary' | 'secondary';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  buttonType?: 'button' | 'submit' | 'reset';
  layout?: Layout;
  actionType: ActionType;
};

function Button({
  onClick,
  children,
  buttonType,
  layout = 'partial',
  actionType,
}: ButtonProps) {
  return (
    <button
      type={buttonType}
      onClick={onClick}
      className={cx(
        layout === 'full' ? 'flex-1' : '',
        actionType === 'primary'
          ? 'bg-bgBlue hover:bg-bgDarkBlue text-white'
          : 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 ',
        `rounded-md md:text-sm text-xs font-semibold py-2 
        px-4 flex justify-center items-center gap-x-1`
      )}
    >
      {children}
    </button>
  );
}

export default Button;

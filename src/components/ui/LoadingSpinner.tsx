import { Oval } from 'react-loader-spinner';

type LoadingSpinnerProps = {
  color?: string;
  size?: number;
};
function LoadingSpinner({ color = '#ffffff', size = 15 }: LoadingSpinnerProps) {
  return (
    <Oval
      height={size}
      width={size}
      color={color}
      visible
      ariaLabel="oval-loading"
      secondaryColor={color}
      strokeWidth={6}
      strokeWidthSecondary={6}
    />
  );
}

// LoadingSpinner.propTypes = defaultProps;

export default LoadingSpinner;

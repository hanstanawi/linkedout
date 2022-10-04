import { Oval } from 'react-loader-spinner';

function LoadingSpinner() {
  return (
    <Oval
      height={15}
      width={15}
      color="#ffffff"
      visible
      ariaLabel="oval-loading"
      secondaryColor="#ffffff"
      strokeWidth={6}
      strokeWidthSecondary={6}
    />
  );
}

export default LoadingSpinner;

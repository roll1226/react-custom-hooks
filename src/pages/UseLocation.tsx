import { FC } from "react";
import { useLocation } from "../hooks/useLocation";

const UseLocation: FC = () => {
  const {
    loading: locationLoading,
    error: locationError,
    data: locationData,
  } = useLocation();

  return (
    <div>
      <div>Loading: {locationLoading.toString()}</div>
      <div>Error: {locationError?.message}</div>
      <div>
        {locationData?.latitude} x {locationData?.longitude}
      </div>
    </div>
  );
};

export default UseLocation;

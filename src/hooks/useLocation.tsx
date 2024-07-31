import { useEffect, useState } from "react";

type Coordinates = {
  latitude: number;
  longitude: number;
  altitude?: number | null;
  accuracy: number;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
};

type UseLocationReturn = {
  loading: boolean;
  error: GeolocationPositionError | null;
  data: Coordinates | null;
};

type UseLocation = (options?: PositionOptions) => UseLocationReturn;

export const useLocation: UseLocation = (options) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [data, setData] = useState<Coordinates | null>(null);

  useEffect(() => {
    const successHandler = (position: GeolocationPosition) => {
      setLoading(false);
      setError(null);
      setData(position.coords);
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setError(error);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    );

    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return { loading, error, data };
};

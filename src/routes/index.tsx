import { useRoutes } from "react-router-dom";
import UseStateWithValidation from "../pages/UseStateWithValidation";

const useAppRoutes = () => {
  return useRoutes([
    {
      path: "/use-state-with-validation",
      element: <UseStateWithValidation />,
    },
  ]);
};

export default useAppRoutes;

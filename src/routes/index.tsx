import { useRoutes } from "react-router-dom";
import UseLongPress from "../pages/UseLongPress";
import UseStateWithValidation from "../pages/UseStateWithValidation";

const useAppRoutes = () => {
  return useRoutes([
    {
      path: "/use-state-with-validation",
      element: <UseStateWithValidation />,
    },
    {
      path: "/use-long-press",
      element: <UseLongPress />,
    },
  ]);
};

export default useAppRoutes;

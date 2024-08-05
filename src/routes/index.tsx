import { useRoutes } from "react-router-dom";
import UseLongPress from "../pages/UseLongPress";
import UseStateWithValidation from "../pages/UseStateWithValidation";
import UseTimeout from "../pages/UseTimeout";
import UseArray from "../pages/useArray";

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
    {
      path: "/use-timeout",
      element: <UseTimeout />,
    },
    {
      path: "/use-array",
      element: <UseArray />,
    },
  ]);
};

export default useAppRoutes;

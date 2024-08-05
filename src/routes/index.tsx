import { useRoutes } from "react-router-dom";
import UseArray from "../pages/useArray";
import UseAsync from "../pages/UseAsync";
import UseClickOutside from "../pages/UseClickOutside";
import UseLongPress from "../pages/UseLongPress";
import UseStateWithValidation from "../pages/UseStateWithValidation";
import UseTimeout from "../pages/UseTimeout";

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
    {
      path: "use-async",
      element: <UseAsync />,
    },
    {
      path: "use-click-outside",
      element: <UseClickOutside />,
    },
  ]);
};

export default useAppRoutes;

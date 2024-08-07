import { useRoutes } from "react-router-dom";
import UseArray from "../pages/UseArray";
import UseAsync from "../pages/UseAsync";
import UseClickOutside from "../pages/UseClickOutside";
import UseCopyToClipboard from "../pages/UseCopyToClipboard";
import UseDebounce from "../pages/UseDebounce";
import UseLongPress from "../pages/UseLongPress";
import UseStateWithValidation from "../pages/UseStateWithValidation";
import UseTimeout from "../pages/UseTimeout";
import UseToggle from "../pages/UseToggle";

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
    {
      path: "use-copy-to-clipboard",
      element: <UseCopyToClipboard />,
    },
    {
      path: "use-debounce",
      element: <UseDebounce />,
    },
    {
      path: "use-toggle",
      element: <UseToggle />,
    },
  ]);
};

export default useAppRoutes;

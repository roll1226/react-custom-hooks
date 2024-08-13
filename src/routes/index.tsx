import { useRoutes } from "react-router-dom";
import UseArray from "../pages/UseArray";
import UseAsync from "../pages/UseAsync";
import UseClickOutside from "../pages/UseClickOutside";
import UseCopyToClipboard from "../pages/UseCopyToClipboard";
import UseDebounce from "../pages/UseDebounce";
import UseFetch from "../pages/UseFetch";
import UseHover from "../pages/UseHover";
import UseLocalStorage from "../pages/UseLocalStorage";
import UseLocation from "../pages/UseLocation";
import UseLongPress from "../pages/UseLongPress";
import UseMediaQuery from "../pages/UseMediaQuery";
import UseOnlineStatus from "../pages/UseOnlineStatus";
import UseOnScreen from "../pages/UseOnScreen";
import UsePrevious from "../pages/UsePrevious";
import UseRenderCount from "../pages/UseRenderCount";
import UseStateWithHistory from "../pages/UseStateWithHistory";
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
    {
      path: "use-render-count",
      element: <UseRenderCount />,
    },
    {
      path: "use-hover",
      element: <UseHover />,
    },
    {
      path: "use-one-screen",
      element: <UseOnScreen />,
    },
    {
      path: "use-online-status",
      element: <UseOnlineStatus />,
    },
    {
      path: "use-previous",
      element: <UsePrevious />,
    },
    {
      path: "use-fetch",
      element: <UseFetch />,
    },
    {
      path: "use-location",
      element: <UseLocation />,
    },
    {
      path: "use-local-storage",
      element: <UseLocalStorage />,
    },
    {
      path: "use-media-query",
      element: <UseMediaQuery />,
    },
    {
      path: "use-state-with-history",
      element: <UseStateWithHistory />,
    },
  ]);
};

export default useAppRoutes;

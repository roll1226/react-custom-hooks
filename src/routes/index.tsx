import { useRoutes } from "react-router-dom";
import UseArray from "../pages/UseArray";
import UseAsync from "../pages/UseAsync";
import UseClickOutside from "../pages/UseClickOutside";
import UseCopyToClipboard from "../pages/UseCopyToClipboard";
import UseDebounce from "../pages/UseDebounce";
import UseEffectOnce from "../pages/UseEffectOnce";
import UseEventListener from "../pages/UseEventListener";
import UseFetch from "../pages/UseFetch";
import UseHover from "../pages/UseHover";
import UseLocation from "../pages/UseLocation";
import UseLongPress from "../pages/UseLongPress";
import UseMediaQuery from "../pages/UseMediaQuery";
import UseOnlineStatus from "../pages/UseOnlineStatus";
import UseOnScreen from "../pages/UseOnScreen";
import UsePrevious from "../pages/UsePrevious";
import UseRenderCount from "../pages/UseRenderCount";
import UseStateWithHistory from "../pages/UseStateWithHistory";
import UseStateWithValidation from "../pages/UseStateWithValidation";
import UseStorage from "../pages/UseStorage";
import UseTimeout from "../pages/UseTimeout";
import UseToggle from "../pages/UseToggle";
import UseTranslation from "../pages/UseTranslation";
import UseUpdateEffect from "../pages/UseUpdateEffect";
import UseWindowSize from "../pages/UseWindowSize";

const useAppRoutes = () => {
  return useRoutes([
    {
      path: "use-effect-once",
      element: <UseEffectOnce />,
    },
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
      element: <UseStorage />,
    },
    {
      path: "use-media-query",
      element: <UseMediaQuery />,
    },
    {
      path: "use-state-with-history",
      element: <UseStateWithHistory />,
    },
    {
      path: "use-translation",
      element: <UseTranslation />,
    },
    {
      path: "use-update-effect",
      element: <UseUpdateEffect />,
    },
    {
      path: "use-window-size",
      element: <UseWindowSize />,
    },
    {
      path: "use-event-listener",
      element: <UseEventListener />,
    },
  ]);
};

export default useAppRoutes;

import { Link } from "react-router-dom";

type link = {
  to: string;
  name: string;
};

const Navbar = () => {
  const links: link[] = [
    {
      to: "use-state-with-validation",
      name: "UseStateWithValidation",
    },
    {
      to: "use-long-press",
      name: "UseLongPress",
    },
    {
      to: "use-timeout",
      name: "UseTimeout",
    },
    {
      to: "use-array",
      name: "UseArray",
    },
    {
      to: "use-async",
      name: "UseAsync",
    },
    {
      to: "use-click-outside",
      name: "UseClickOutside",
    },
    {
      to: "use-copy-to-clipboard",
      name: "UseCopyToClipboard",
    },
    {
      to: "use-debounce",
      name: "UseDebounce",
    },
    {
      to: "use-toggle",
      name: "UseToggle",
    },
    {
      to: "use-render-count",
      name: "UseRenderCount",
    },
    {
      to: "use-hover",
      name: "UseHover",
    },
    {
      to: "use-one-screen",
      name: "UseOneScreen",
    },
    {
      to: "use-online-status",
      name: "UseOnlineStatus",
    },
    {
      to: "use-previous",
      name: "UsePrevious",
    },
    {
      to: "use-fetch",
      name: "UseFetch",
    },
    {
      to: "use-location",
      name: "UseLocation",
    },
    {
      to: "use-local-storage",
      name: "UseLocalStorage",
    },
  ];

  return (
    <>
      {links.map((link, index) => (
        <>
          <Link to={link.to}>{link.name}</Link>
          {index !== links.length - 1 && <> | </>}
        </>
      ))}
    </>
  );
};

export default Navbar;

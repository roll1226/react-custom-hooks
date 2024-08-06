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

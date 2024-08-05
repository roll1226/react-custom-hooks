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
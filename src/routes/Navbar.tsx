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
  ];

  return (
    <>
      {links.map((link) => (
        <Link to={link.to}>{link.name}</Link>
      ))}
    </>
  );
};

export default Navbar;

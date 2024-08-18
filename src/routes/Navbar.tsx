import { NavLink } from "react-router-dom";
import { links } from "./links";

const Navbar = () => {
  return (
    <>
      {links.map((link, index) => (
        <>
          <NavLink
            to={link.to}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <button>{link.name}</button>
          </NavLink>
          {index !== links.length - 1 && <> | </>}
        </>
      ))}
    </>
  );
};

export default Navbar;

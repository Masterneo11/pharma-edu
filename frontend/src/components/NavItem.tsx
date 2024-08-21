import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  name: string;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({ name, path }) => {
  return (
    <div>
      <Link to={path}>{name}</Link>
    </div>
  );
};

export default NavItem;

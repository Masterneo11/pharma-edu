import React from "react";
import NavItem from "./NavItem";
import routes from "../routes";
import dixiebanner from '../assets/DixieTechLogo_Artboard-08.png';


const Nav: React.FC = () => {
  return (
    <nav>
      <div className="MainNav">
        <div className='dixieban'>
          < img src={dixiebanner} alt='dixiebanner' id='cat'></img >
        </div >
        <ul>
          {routes.map((route, index) => (
            <NavItem key={index} name={route.name} path={route.path} />
          ))}
        </ul>
      </div>
    </nav >
  );
};

export default Nav;

import React from "react";
import NavItem from "./NavItem";
import routes from "../routes";
import dixiebanner from '../assets/DixieTechLogo_Artboard-08.png';

interface interfaceFillerWord {
  Fillerword: string
}

const Nav: React.FC<interfaceFillerWord> = ({ Fillerword }) => {
  return (
    <nav>
      <div className="MainNav">
        <div className='fillerword'> {Fillerword}</div>

        <ul>
          {routes.map((route, index) => (
            <NavItem key={index} name={route.name} path={route.path} />
          ))}
        </ul>
        <div className='dixieban'>
          < img src={dixiebanner} alt='dixiebanner' id='cat'></img >
        </div >
      </div>
    </nav >
  );
};

export default Nav;

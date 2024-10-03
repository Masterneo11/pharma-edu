import React from "react";
import banner from "../assets/MedBanner.png"
import campus from '../assets/campuspic.jpeg'

const Home: React.FC = () => {
  return <>

    <div className="hme"><div className="background"></div><div className="campuspic">
      <div className="fading-div"></div>
      <div className="overlay"> Pharmacy Interface Practice </div>

      {/* <div className="overlays"> have fun </div> */}
    </div>

      {/* <button className="overlayss"> Log In </button> */}

      <a href='/SignIN'>
        <button className="btn btn-primary LoginButton "> Log In </button>
      </a>
      <div className='hm'>
      </div>
    </div>
  </>;
};

export default Home;

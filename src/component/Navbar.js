import React, {useState} from 'react';
import '../styles/Navbar.css';
import Popup from './Popup';
import Camera from './Camera';
export default function Navbar() {
  const [active, setActive] = useState("nav_menu");
  const [toggleIcon, setToggleIcon] = useState("nav_toggler");
  const [isOpen, setIsOpen] = useState(false);
  const navToggle = () => {
    active === "nav_menu" 
      ? setActive("nav_menu nav_active") 
      : setActive("nav_menu");

    toggleIcon === "nav_toggler"
      ? setToggleIcon("nav_toggler toggle")
      : setToggleIcon("nav_toggler");
    }
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
    return (
  <nav className="nav navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-md">
    <ul className={active}>
      <li className="nav_item"><a href="#" className="nav_link">Home</a></li>
      <li className="nav_item nav_link" onClick={togglePopup}>Check In</li>
      <li className="nav_item nav_link"><a href="https://dev.azure.com/">Work Board</a></li>
      </ul>
    <div onClick={navToggle} className={toggleIcon}>
      <div className="line1"></div>
      <div className="line2"></div>
      <div className="line3"></div>
    </div>
    </div>
    {isOpen && <Popup
      content={<>
        <h2>Attendance</h2>
        <Camera/>
      </>}
      handleClose={togglePopup}
    />}

  </nav>
    )
  }